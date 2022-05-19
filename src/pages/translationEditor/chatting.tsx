import {Element, HOTKEYS, Leaf, toggleMark} from 'components/editor/editorTools';
import Tools from 'components/editor/tools';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {createEditor} from 'slate';
import {withHistory} from 'slate-history';
import {Editable, Slate, withReact} from 'slate-react';
import isHotkey from 'is-hotkey';
import {cursorFocusOnEditor} from 'helper/domManupulation';
import WarningTooltip from './warningTooltip';
import ChattingIssueTable from 'components/chattingIssueTable';
import {showToastMessage} from 'helper/toastMessages';
import ReactTooltip from 'react-tooltip';
import {useSelector} from 'react-redux';
import {issuesSelector} from 'redux/selector';
import {Attachment, Comment} from 'services/api.interfaces';
import {ISelectedCaption} from 'types';
import {setValueInLocalStorage} from 'util/storage';
import {StorageKeys} from 'services/enums';

export interface IssuesDataInterface {
  status?: string;
  assignee?: string;
  assigneeId?: string;
  reviwer?: string;
  target?: string;
  issueType?: string;
  issueTypeId?: number;
  reporter?: string;
  workflowName?: string;
  createdAt?: number;
  updated?: number;
  comments: Comment[];
  attachmentId?: string;
  issueId?: number;
  lockVersion?: number;
  jobId?: string;
  title?: string;
  description?: string;
  workFlowId?: string;
}

interface Props {
  editorValue: any;
  selectedCaption: ISelectedCaption;
  selected: any;
  fireResolutionIssues: any;
  handleEditor: (value: any, from: string) => void;
  handleSelect: (value: any, i: number) => void;
  handleIssueModal: () => void;
}

const Chatting = ({
  editorValue,
  selectedCaption,
  selected,
  fireResolutionIssues,
  handleEditor,
  handleSelect,
  handleIssueModal,
}: Props) => {
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor() as any)), []);
  const [played, setPlayed] = useState(false);
  const issues: Attachment[] | null = useSelector((state: any) => issuesSelector(state));
  const [issuesData, setIssuesData] = useState<IssuesDataInterface>({comments: []});

  const handlePlay = () => {
    setPlayed(!played);
  };

  useEffect(() => {
    cursorFocusOnEditor('chatting-1');
  }, []);

  useEffect(() => {
    if (Array.isArray(issues)) {
      if (issues.length) {
        const data: IssuesDataInterface = {
          status: issues[0].issue.status,
          assignee: issues[0].issue.assignee.name,
          assigneeId: issues[0].issue.assignee.id,
          reviwer: issues[0].issue.reviewer.name,
          target: issues[0].issue['target-workflow-step'].name,
          issueType: issues[0].issue['issue-type-instance-name'],
          issueTypeId: issues[0].issue.id,
          reporter: issues[0].issue.reporter.name,
          workflowName: issues[0].issue['initial-workflow-step-name'],
          createdAt: issues[0].issue['created-at'],
          updated: issues[0].issue['updated-at'],
          comments: issues[0].issue['issue-comments'],
          attachmentId: issues[0].id,
          issueId: issues[0].issue.id,
          lockVersion: issues[0].issue['lock-version'],
          jobId: issues[0]['attached-to-id'],
          title: issues[0].issue.title,
          description: issues[0].issue.description,
          workFlowId: issues[0].issue['target-workflow-step'].id,
        };
        setIssuesData(data);
        setValueInLocalStorage(StorageKeys.editIssues, data);
      }
    }
  }, [issues]);

  return (
    <div className="">
      <p>The purpose of this issue is to show how they work.</p>
      <ChattingIssueTable data={issuesData} />
      <div>
        <div className="edit-stp-in-issue-modal my-3">
          <hr />
          <Slate editor={editor} value={editorValue} onChange={(v: any) => handleEditor(v, 'chatting')}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '6rem'}}>
                <i
                  className="far fa-circle fa-lg text-light-gray"
                  title="Valid"
                  onClick={() => {
                    showToastMessage('captionError', 'Your job was saved.');
                  }}
                />
                <div>
                  <WarningTooltip id="chatIssueWaring" />
                  <i data-tip data-for="chatIssueWaring" className="far fa-exclamation-triangle fa-lg warnings" />
                </div>
                <div className="audio-player-play-button">
                  <i
                    className={`fas ${played ? 'fa-pause' : 'fa-play'} fa-lg`}
                    title="Start audio playback"
                    onClick={handlePlay}
                  />
                </div>
              </div>
              <div className="mb-2">
                <div className="rtui-slatejs-toolbar">
                  <Tools
                    index={`${selectedCaption.blockIndex}${selectedCaption.pairIndex}`}
                    selected={selected}
                    handleCurentActiveTools={handleSelect}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="mb-2 rtui-block-el-p rtui-block-class-normal_pn">
                <span className="rtui-gap_mark">%</span>Now that was really remarkable, a—a young fellow like that, and
                say, make a remark like that.
              </div>
              <div className="rtui-block-el-p rtui-block-class-normal_pn make-editor-active">
                <Editable
                  className={`editor editor-chatting-1`}
                  renderElement={renderElement}
                  renderLeaf={renderLeaf}
                  spellCheck
                  autoFocus={true}
                  onKeyDown={(event) => {
                    for (const hotkey in HOTKEYS) {
                      if (isHotkey(hotkey, event as any)) {
                        event.preventDefault();
                        const mark = HOTKEYS[hotkey];
                        toggleMark(editor, mark);
                      }
                    }
                  }}
                />
              </div>
              <hr />
            </div>
          </Slate>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <ReactTooltip
          clickable={true}
          delayShow={200}
          delayHide={200}
          place="right"
          type="light"
          effect="solid"
          globalEventOff="click">
          <div className="popover-body">
            <div className="form-group">
              <label htmlFor="issue_fire_resolution_event">Issue resolution</label>
              <select className="form-control" id="issue_fire_resolution_event">
                {fireResolutionIssues.map((item: any) => (
                  <option key={item[1]} value={item[1]}>
                    {item[0]}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="text-muted" htmlFor="issue_resolution_reason">
                Reason for not fixing issue
              </label>
              <textarea disabled id="issue_resolution_reason" className="form-control" defaultValue={''} />
            </div>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-secondary mt-2 btn-sm">
                Close issue
              </button>
            </div>
          </div>
        </ReactTooltip>
        <button data-tip="custom show" data-event="click focus" type="button" className="mr-1 btn btn-light btn-sm">
          Close issue…
        </button>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#editIssue"
          className="btn btn-light btn-sm"
          onClick={handleIssueModal}>
          Edit…
        </button>
      </div>
      <hr />
      <h5>Comments and updates</h5>
      <div className="issue-timeline">
        <div className="form-group mb-3">
          <textarea className="form form-control" defaultValue={''} />
        </div>
        <div className="d-flex justify-content-end">
          <button disabled type="button" className="btn btn-secondary btn-sm">
            Post comment
          </button>
        </div>
        <ul className="issue-comments timeline">
          {issuesData.comments.map((item: any) => (
            <li key={item['created-at']} className="timeline-item m-0 ml-3 my-2">
              <div className="card bg-light">
                <div className="card-body py-1">
                  <span className="small text-muted">
                    {issuesData.assignee} {item.description} <span title="12/13/2021">10 days ago</span>
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chatting;
