import classNames from 'classnames';
import {reviewModeNodeSerialize} from 'helper/editorStringNormalize';
import React, {useEffect, useState} from 'react';
import {Audio2, Block, Pair} from 'services/api.interfaces';
import RowTools from './rowTools';
import {EditorMode, shouldShowCommentIcon} from './subtitlePairs';
import {v4 as uuidv4} from 'uuid';
import {cloneDeep} from 'lodash';
import {useDispatch} from 'react-redux';
import {ui_setIssues} from 'redux/uiSlice';
import { $ } from 'helper/domManupulation';

const validationsSets: any = {
  'block-boundaries': {
    source: 0,
    target: 0,
    valid: true,
  },
  eagles: {
    source: 0,
    target: 0,
    valid: true,
  },
  formattings: {
    source: [],
    target: [],
    valid: true,
  },
  'gap-marks': {
    source: 0,
    target: 0,
    valid: true,
  },
  'paragraph-numbers': {
    source: [],
    target: [],
    valid: true,
  },
  repositext: {
    errors: [],
    response: 'error',
    valid: true,
    warnings: [],
  },
};

interface ReviewModeProps {
  subTitlePairs: Pair[];
  block: Block;
  blockEditorValue: any;
  blockIndex: number;
  blocksLength: number;
  blockPairsLength: number;
  audioPlayed: boolean;
  handleCaption: (editor: any, blockIndex: number, pairIndex: number) => void;
  playAudio: (audio: Audio2) => void;
  pauseAudio: () => void;
  setAudioPlayed: (value: boolean) => void;
  handleChatModal: () => void;
}

const ReviewMode = ({
  subTitlePairs,
  block,
  blockEditorValue,
  blockIndex,
  blocksLength,
  blockPairsLength,
  audioPlayed,
  handleCaption,
  playAudio,
  pauseAudio,
  setAudioPlayed,
  handleChatModal,
}: ReviewModeProps) => {
  const dispatch = useDispatch();
  const [validations, setValidations] = useState(cloneDeep(validationsSets));

  useEffect(() => {
    if (subTitlePairs) {
      const validationObj: any = cloneDeep(validationsSets);
      const sourceTargetSet = (key: any, pair: any) => {
        validationObj[key].source += pair.validations[key].source;
        validationObj[key].target += pair.validations[key].target;
        if (validationObj[key].valid) {
          validationObj[key].valid = pair.validations[key].valid;
        }
      };

      subTitlePairs.forEach((pair: any, index: number) => {
        const validationKeys = Object.keys(pair.validations);
        validationKeys.forEach((key: string) => {
          if (key === 'block-boundaries') {
            sourceTargetSet(key, pair);
          } else if (key === 'eagles') {
            sourceTargetSet(key, pair);
          } else if (key === 'formattings') {
            const formattingSource = pair.validations[key].source;
            const formattingTarget = pair.validations[key].target;
            formattingSource.forEach((style: string) => {
              if (!validationObj[key].source.includes(style)) {
                validationObj[key].source.push(style);
              }
            });

            formattingTarget.forEach((style: string) => {
              if (!validationObj[key].target.includes(style)) {
                validationObj[key].target.push(style);
              }
            });
            if (validationObj[key].valid) {
              validationObj[key].valid = pair.validations[key].valid;
            }
          } else if (key === 'gap-marks') {
            sourceTargetSet(key, pair);
          } else if (key === 'paragraph-numbers') {
            const paragraphNumerSource = pair.validations[key].source;
            const paragraphNumerTarget = pair.validations[key].target;
            paragraphNumerSource.forEach((style: string) => {
              if (!validationObj[key].source.includes(style)) {
                validationObj[key].source.push(style);
              }
            });

            paragraphNumerTarget.forEach((style: string) => {
              if (!validationObj[key].target.includes(style)) {
                validationObj[key].target.push(style);
              }
            });
            if (validationObj[key].valid) {
              validationObj[key].valid = pair.validations[key].valid;
            }
          } else if (key === 'repositext') {
            const repositTextWarnings = pair.validations[key].warnings;
            const repositTestErrors = pair.validations[key].errors;
            repositTextWarnings.forEach((style: string) => {
              if (!validationObj[key].warnings.includes(style)) {
                validationObj[key].warnings.push(style);
              }
            });

            repositTestErrors.forEach((style: string) => {
              if (!validationObj[key].errors.includes(style)) {
                validationObj[key].errors.push(style);
              }
            });
            if (validationObj[key].valid) {
              validationObj[key].valid = pair.validations[key].valid;
            }
          }
        });
      });
      setValidations(validationObj);
    }
  }, [subTitlePairs]);

  const getBlockPairHTML = () => {
    const sourceHTML = subTitlePairs.map((pair: Pair) => pair.source.html);
    return sourceHTML.join(' ');
  };

  const normalizedStrings = reviewModeNodeSerialize(blockEditorValue);

  const handleChattingModal = (issuesAttachments: any) => {
    dispatch(ui_setIssues(issuesAttachments));
    handleChatModal();
  };

  const handlePairSelected = (e:any,pairIndex: number) => {
    e.stopPropagation();
    handleCaption(null, blockIndex, pairIndex);
    $('#editCaption').modal('show');
  };

  return (
    <div className={classNames('tred_row')}>
      <div
        className={`tred_row_col_source rtui-block-el-${block.type}`}
        dangerouslySetInnerHTML={{__html: getBlockPairHTML()}}></div>
      <div
        aria-disabled={true}
        className={classNames('tred_row_col_translate translate_pd', `rtui-block-el-${block.type}`)}>
        {normalizedStrings.map((item: any, index: number) => (
          <span
            key={uuidv4()}
            onClick={(e) => handlePairSelected(e, item.pairIndex)}
            className={
              index === 0 && item.htmlString.includes('rtui-ial-class-pn')
                ? ''
                : item.htmlString !== `<span class="paragraph"></span>`
                ? 'rtui-tred-stp--has-warnings'
                : ''
            }
            dangerouslySetInnerHTML={{__html: item.htmlString}}
          />
        ))}
      </div>
      <div className={classNames('tred_row_col_tool')}>
        {subTitlePairs.map(
          (pair: Pair) =>
            shouldShowCommentIcon(pair['issue-attachments']) && (
              <span key={uuidv4()}>
                <button
                  data-tip
                  data-for="commentMsg"
                  data-bs-toggle="modal"
                  data-bs-target="#chatting"
                  type="button"
                  className="btn btn-sm mb-3 btn btn-warning"
                  data-toggle="tooltip"
                  data-placement="top"
                  title={`${
                    pair['issue-attachments'].length ? pair['issue-attachments'][0].issue['display-number'] : ''
                  } To demonstrate issues"`}
                  onClick={() => handleChattingModal(pair['issue-attachments'])}>
                  <i className="fas fa-comment-exclamation " /> 1
                </button>
              </span>
            ),
        )}
        <span></span>
        <RowTools
          index={blockIndex}
          isActive={false}
          audio={block.audio}
          validations={validations}
          otherValidationData={null}
          elementType={block.type}
          blockIndex={blockIndex}
          pairIndex={0}
          blocksLength={blocksLength}
          blockPairsLength={blockPairsLength}
          editor={{}}
          audioPlayed={audioPlayed}
          editorMode={EditorMode.review}
          handleCaption={handleCaption}
          playAudio={playAudio}
          pauseAudio={pauseAudio}
          handleSelection={() => {}}
          setAudioPlayed={setAudioPlayed}
        />
      </div>
    </div>
  );
};

export default ReviewMode;
