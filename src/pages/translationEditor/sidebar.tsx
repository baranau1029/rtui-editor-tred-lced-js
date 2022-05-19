import {EditorMode} from 'components/editor/editorRow';
import Modal from 'components/modal/modal';
import ValidationWarnings from 'components/validationWarnings';
import React, {forwardRef, memo, useEffect, useState} from 'react';
import {Block, Pair} from 'services/api.interfaces';
import CaptionTypeOptions from './captionTypeOptions';
import Jobinfo from './jobinfo';
import {v4 as uuidv4} from 'uuid';
import {msToHour} from 'helper/time';
import {ISelectedCaption} from 'types';
import {get} from 'lodash';
import {hasCaptionError} from 'helper/captionValidation';
import {shouldShowCommentIcon} from 'components/editor/subtitlePairs';
import {Transforms, Editor as EditorInstance} from 'slate';
import {useDispatch} from 'react-redux';
import {actionTypes} from 'services/actionTypes';

interface SidebarProps {
  captionInfo: any;
  editMode: EditorMode;
  pairIndex: number;
  jobData: any;
  selectedCaption: ISelectedCaption;
  allJobData: any;
  loading: boolean;
  editorInstance: any;
  blockIndex: number;
  setTop: () => void;
  setBottom: () => void;
  handleReset: () => void;
}

const Sidebar = forwardRef(
  (
    {
      editMode,
      captionInfo,
      blockIndex,
      pairIndex,
      jobData,
      selectedCaption,
      allJobData,
      loading,
      editorInstance,
      handleReset,
      setTop,
      setBottom,
    }: SidebarProps,
    ref,
  ): JSX.Element => {
    const [jobInfo, setJobInfo] = useState<any>({});
    const dispatch = useDispatch();

    const insertMark = (markSign: string, options: any) => {
      const nodeIndex = editorInstance.selection.focus.path[0];
      const childrenIndex = editorInstance.selection.focus.path[1];
      const cursorAt = editorInstance.selection.focus.offset;

      const preText = editorInstance.children[nodeIndex].children[childrenIndex].text.substring(0, cursorAt);
      const postText = editorInstance.children[nodeIndex].children[childrenIndex].text.substring(
        cursorAt,
        editorInstance.children[nodeIndex].children[childrenIndex].text.length,
      );
      const preLeaf = {...editorInstance.children[nodeIndex].children[childrenIndex], text: preText};
      const preMidLeaf = {...editorInstance.children[nodeIndex].children[childrenIndex], text: ''};
      const midLeaf = {...editorInstance.children[nodeIndex].children[childrenIndex], text: markSign, ...options};
      const postMidLeaf = {...editorInstance.children[nodeIndex].children[childrenIndex], text: ''};
      const postLeaf = {...editorInstance.children[nodeIndex].children[childrenIndex], text: postText};

      let nodes: any = [];
      if (childrenIndex === 0) {
        nodes = [{type: 'paragraph', children: [preLeaf, preMidLeaf, midLeaf, postMidLeaf, postLeaf]}];
      } else if (childrenIndex > 0) {
        nodes = [
          {
            type: 'paragraph',
            children: [
              ...editorInstance.children[nodeIndex].children.slice(0, childrenIndex),
              preLeaf,
              preMidLeaf,
              midLeaf,
              postMidLeaf,
              postLeaf,
            ],
          },
        ];
      }

      Transforms.delete(editorInstance, {
        at: {
          anchor: EditorInstance.start(editorInstance, []),
          focus: EditorInstance.end(editorInstance, []),
        },
      });
      Transforms.insertNodes(editorInstance, nodes, {
        at: [0],
      });
    };

    useEffect(() => {
      const handleKeyDown = (e: any) => {
        if (e.shiftKey && e.code === 'Digit5') {
          insertMark('%', {mark: true});
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    const completionStatusOf = (blocks: Block[], type: string) => {
      let count = 0;
      blocks.forEach((block: Block) => {
        block['subtitle-pairs'].forEach((pair: Pair) => {
          if (pair['completion-status'] === type && type !== 'invalid') {
            count += 1;
          }
          if (type === 'invalid' && hasCaptionError(pair.validations)) {
            count += 1;
          }
          if (type === 'issues' && shouldShowCommentIcon(pair['issue-attachments'])) {
            count += 1;
          }
        });
      });
      return count;
    };

    useEffect(() => {
      if (jobData.length && allJobData) {
        setJobInfo({
          jobId: get(jobData[0], 'source-file.date-code'),
          lang: get(jobData[0], 'target-language-code-3'),
          completed: completionStatusOf(jobData[0].blocks, 'completed'),
          pending: completionStatusOf(jobData[0].blocks, 'pending'),
          invalid: completionStatusOf(jobData[0].blocks, 'invalid'),
          issues: completionStatusOf(jobData[0].blocks, 'issues'),
          wordCount: get(jobData[0], 'source-file.word-count'),
          commit: String(get(jobData[0], 'source-file.git-commit')).substring(0, 11),
          workflow: get(allJobData['sg-entities'][0], 'workflow-step.display-name'),
          status: get(allJobData['sg-entities'][0], 'state'),
          translationId: get(allJobData['sg-entities'][0], 'alleds-translation-job/id'),
        });
      }
    }, [jobData, allJobData]);

    const getInfo = (key?: string | null, subKey?: string | null, mainKey?: string | null) => {
      const objKey = mainKey || 'validations';
      if (captionInfo['subtitle-pairs']?.length && key && subKey) {
        return captionInfo['subtitle-pairs'][pairIndex][objKey][key][subKey];
      }
      if (!key && !subKey && captionInfo['subtitle-pairs']) {
        return captionInfo['subtitle-pairs'][pairIndex][objKey];
      }
      return null;
    };

    if (loading) {
      return <div className="tred_sidebar_content"></div>;
    }

    const handleGapMakrInsertion = () => {
      insertMark('%', {mark: true});
      dispatch({type: actionTypes.UPDATE_GAP_MARK, payload: {blockIndex, pairIndex, jobId: 0}});
    };

    const handleEagleMark = () => {
      insertMark('', {eagle: true});
      dispatch({type: actionTypes.UPDATE_EAGLE_MARK, payload: {blockIndex, pairIndex, jobId: 0}});
    };

    const handleParagraphMark = (number: string[]) => {
      const nodeIndex = editorInstance.selection.focus.path[0];
      const activeTools = editorInstance.children[nodeIndex].children[0];

      const nodes = [
        {
          type: 'paragraph',
          children: [
            {text: number[0], number: true},
            {...activeTools, text: ' '},
            ...editorInstance.children[nodeIndex].children,
          ],
        },
      ];
      Transforms.delete(editorInstance, {
        at: {
          anchor: EditorInstance.start(editorInstance, []),
          focus: EditorInstance.end(editorInstance, []),
        },
      });
      Transforms.insertNodes(editorInstance, nodes, {
        at: [0],
      });
    };

    return (
      <div className="tred_sidebar_content">
        <Modal name="Translation Job info" id="jobinfo">
          <Jobinfo
            jobId={jobInfo.jobId}
            targetLang={jobInfo.lang}
            completed={jobInfo.completed}
            pending={jobInfo.pending}
            invalid={jobInfo.invalid}
            open={jobInfo.issues}
            closed=""
            sourceWordsCount={jobInfo.wordCount}
            lastSync="7 minutes ago"
            gitCommitId={jobInfo.commit}
            jobStepName={jobInfo.workflow}
            status={jobInfo.status}
          />
        </Modal>
        <div className="rtui-tred-main-tools__top">
          <div className="rtui-tred-main-tools-section card" style={{maxHeight: '100%', overflowY: 'auto'}}>
            <div className="card-body">
              <CaptionTypeOptions
                ref={ref}
                editMode={editMode}
                jobData={jobData}
                selectedCaption={selectedCaption}
                translationId={jobInfo.translationId}
                setTop={setTop}
                setBottom={setBottom}
              />
              {editMode === EditorMode.edit && (
                <React.Fragment>
                  <h4 title="STID: initial-caption-1" className="card-title">
                    Current caption
                  </h4>
                  <div className="rtui-tred-tools-caption-status">
                    <div>
                      <p>
                        <span className="badge badge-light mr-1">{captionInfo?.type}</span>
                        {!!captionInfo?.classes &&
                          captionInfo.classes.map((cls: string) => (
                            <span key={uuidv4()} className="badge badge-light mr-1">
                              {cls}
                            </span>
                          ))}
                      </p>
                      {!!getInfo('block-boundaries', 'source') && (
                        <p className="mt-1 text-success">Paragraph breaks {getInfo('block-boundaries', 'source')}</p>
                      )}

                      {(getInfo('eagles', 'target') > 0 || getInfo('eagles', 'source') > 0) && (
                        <>
                          {getInfo('eagles', 'target') < getInfo('eagles', 'source') ? (
                            <p className="mt-1 text-danger" onClick={handleEagleMark}>
                              Eagles {getInfo('eagles', 'target')}/{getInfo('eagles', 'source')}
                            </p>
                          ) : (
                            <p className="mt-1 text-success">Eagles {getInfo('eagles', 'target')}</p>
                          )}
                        </>
                      )}

                      {!!getInfo('formattings', 'source')?.length && (
                        <p className="mt-1 text-danger">Formattings: {getInfo('formattings', 'source').join(' ')}</p>
                      )}
                      {!!getInfo('formattings', 'target')?.length && (
                        <p className="mt-1 text-success">Formattings: {getInfo('formattings', 'target').join(' ')}</p>
                      )}
                      {(getInfo('gap-marks', 'target') > 0 || getInfo('gap-marks', 'source') > 0) && (
                        <>
                          {getInfo('gap-marks', 'target') < getInfo('gap-marks', 'source') ? (
                            <p className="mt-1 text-danger" onClick={handleGapMakrInsertion}>
                              Gap marks {getInfo('gap-marks', 'target')}/{getInfo('gap-marks', 'source')}
                            </p>
                          ) : (
                            <p className="mt-1 text-success">Gap marks {getInfo('gap-marks', 'source')}</p>
                          )}
                        </>
                      )}
                      {!!getInfo('paragraph-numbers', 'source')?.length &&
                        (getInfo('paragraph-numbers', 'valid') ? (
                          <p className="mt-1 text-success">
                            Paragraph numbers #{getInfo('paragraph-numbers', 'source')}
                          </p>
                        ) : (
                          <p
                            className="mt-1 text-danger"
                            onClick={() => handleParagraphMark(getInfo('paragraph-numbers', 'source'))}>
                            Paragraph numbers #{getInfo('paragraph-numbers', 'source')}
                          </p>
                        ))}
                      {getInfo(null, null, 'completion-status') && (
                        <p className="mt-1 bage-title">
                          Status
                          <span className="badge-pill badge badge-light">
                            {getInfo(null, null, 'completion-status')}
                          </span>
                        </p>
                      )}
                      {getInfo(null, null, 'source') && (
                        <p className="mt-1 bage-title">
                          Audio Start
                          <span className="badge-pill badge badge-light">
                            {msToHour(
                              getInfo(null, null, 'source').audio['duration-msec'] +
                                getInfo(null, null, 'source').audio['start-msec'],
                            )}
                          </span>
                        </p>
                      )}
                    </div>

                    <div className="d-flex" />
                    <div />
                    {!!getInfo('repositext', 'warnings')?.length && (
                      <ValidationWarnings>
                        <ul>
                          {getInfo('repositext', 'warnings').map((war: string) => (
                            <li key={uuidv4()} dangerouslySetInnerHTML={{__html: war}}></li>
                          ))}
                        </ul>
                      </ValidationWarnings>
                    )}
                    <p>
                      <button className="btn btn-light mt-2" onClick={handleReset}>
                        Reset
                      </button>
                    </p>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default memo(Sidebar);
