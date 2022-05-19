import EditorRow, {EditorMode} from 'components/editor/editorRow';
import {debounce, get} from 'lodash';
import {createRef, useCallback, useEffect, useRef, useState} from 'react';
import './style.scss';
import ReactTooltip from 'react-tooltip';
import Tooltip from './tooltip';
import WarningTooltip from './warningTooltip';
import TooltipError from './tooltipError';
import Sidebar from './sidebar';
import EditorTopTools from 'components/editorTopTools';
import {Transforms, Editor as EditorInstance} from 'slate';
import SidebarTopButtons from './sidebarTopButtons';
import {closeIssuesModal, cursorFocusOnEditor, triggetUpdateIssueForm} from 'helper/domManupulation';
import JobBio from './jobBio';
import Spinner from 'components/spinner';
import Toasters from 'components/toasters';
import Modal from 'components/modal/modal';
import Chatting from './chatting';
import IssueForm from './issueForm';
import {useDispatch, useSelector} from 'react-redux';
import {job_activate} from 'redux/slice';
import {
  allJobDataSelector,
  audioPlayedFromSelector,
  captionActiveToolsSelector,
  editorSlateValues,
  editorToolsSelected,
  jobCurrentCaptionSelector,
  jobsOrmSelector,
  modifiedBlockSelector,
  saveClickedSelector,
  uiLoadingSelector,
} from 'redux/selector';
import {Audio2, Block} from 'services/api.interfaces';
import {ISelectedCaption} from 'types';
import {
  ui_resetEditorState,
  ui_saveClicked,
  ui_setSelectedCaption,
  ui_updateBlockModified,
  ui_updatedSelectedTools,
  ui_updateEditorState,
} from 'redux/uiSlice';
import ChatTooltip from './chatTooltip';
import {getDataFromEntities} from 'helper/getDataFromEntities';
import {IssuesTypes} from 'services/enums';
import {getIssueByKey} from 'util/common';
import {editorStringNormalize} from 'helper/editorStringNormalize';
import {useKeyboardInputs} from 'hooks/useKeyboardInputs';
import EditPerticularCaption from './EditPerticularCaption';
import {actionTypes} from 'services/actionTypes';

const Editor = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState<EditorMode>(EditorMode.edit);
  const [editorInstance, setEditorInstance] = useState();
  const mainContentRef = createRef<HTMLDivElement>();
  const [showModal, setShowModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const jobData = useSelector((state) => jobsOrmSelector(state));
  const selected: any = useSelector((state: any) => editorToolsSelected(state));
  const editorValues = useSelector((state: any) => editorSlateValues(state));
  const captionSelected: any = useSelector((state: any) => jobCurrentCaptionSelector(state));
  const loading = useSelector((state: any) => uiLoadingSelector(state));
  const saveClicked = useSelector((state: any) => saveClickedSelector(state));
  const allJobData = useSelector((state: any) => allJobDataSelector(state));
  const modifiedBlocks = useSelector((state: any) => modifiedBlockSelector(state));
  const audioPlayedFrom = useSelector((state: any) => audioPlayedFromSelector(state));
  const activeCaptionTools = useSelector((state: any) => captionActiveToolsSelector(state));

  const audioPlayerRef = useRef<any>();
  const [audioPlayed, setAudioPlayed] = useState(false);
  useKeyboardInputs(jobData, captionSelected);

  useEffect(() => {
    dispatch(job_activate({loader: true}));
  }, []);

  useEffect(() => {
    if (!loading) {
      const element = document.querySelector('iframe');
      if (element) {
        element.remove();
      }
      ReactTooltip.rebuild();
    }
  }, [captionSelected, loading]);

  const handleSelect = useCallback(
    (value: string, i: number) => {
      dispatch(ui_updatedSelectedTools({toolName: value}));
    },
    [dispatch],
  );

  const resetEditoInstance = (editorInstance: any) => {
    Transforms.delete(editorInstance, {
      at: {
        anchor: EditorInstance.start(editorInstance, []),
        focus: EditorInstance.end(editorInstance, []),
      },
    });
  };

  const handleEditor = debounce((value: any, from?: any) => {
    if (from === 'chatting') {
      if (editorInstance) {
        (editorInstance as any).children = value;
      }
    }
    dispatch(ui_updateEditorState(value));
    dispatch(ui_updateBlockModified(captionSelected));
  }, 500);

  const handleMode = (type: EditorMode) => {
    if (type === EditorMode.edit) {
      cursorFocusOnEditor(`${captionSelected.blockIndex}${captionSelected.pairIndex}`);
    }
    setMode(type);
  };

  const handleReset = () => {
    const blockIndex = captionSelected.blockIndex;
    const pairIndex = captionSelected.pairIndex;
    dispatch(ui_resetEditorState({pair: jobData[0].blocks[blockIndex]['subtitle-pairs'][captionSelected.pairIndex]}));
    dispatch({type: actionTypes.UPDATE_GAP_MARK, payload: {blockIndex, pairIndex, jobId: 0}});
    dispatch({type: actionTypes.UPDATE_EAGLE_MARK, payload: {blockIndex, pairIndex, jobId: 0}});
    dispatch({type: actionTypes.PAIR_COMPLETION_STATUS_PENDING, payload: {blockIndex, pairIndex, jobId: 0}});
   
    if (editorInstance) {
      resetEditoInstance(editorInstance);
    }
    cursorFocusOnEditor(`${captionSelected.blockIndex}${captionSelected.pairIndex}`);
  };

  const handleSaveClick = () => {
    editorStringNormalize(modifiedBlocks, editorValues, jobData[0], allJobData, dispatch);
    dispatch(ui_saveClicked(true));
  };

  const handleCaption = (editor: any, blockIndex: number, pairIndex: number) => {
    if (mode === EditorMode.edit && editor) {
      dispatch(ui_setSelectedCaption({blockIndex, pairIndex}));
      setEditorInstance(editor);
    } else if (!editor) {
      dispatch(ui_setSelectedCaption({blockIndex, pairIndex}));
    }
  };

  const handleTopCaptionSelect = () => {
    dispatch(ui_setSelectedCaption({blockIndex: 0, pairIndex: 0}));
  };

  const handleBottomCaptionSelect = () => {
    if (jobData.length) {
      dispatch(
        ui_setSelectedCaption({
          blockIndex: jobData[0].blocks.length - 1,
          pairIndex: jobData[0].blocks[jobData[0].blocks.length - 1]['subtitle-pairs'].length - 1,
        }),
      );
    }
  };

  const handlePlayAudio = (newAudio: Audio2) => {
    const player: any = audioPlayerRef.current;
    if (player) {
      player.currentTime = newAudio['start-msec'] / 1000;
      player?.play();
    }
  };

  const handlePauseAudio = () => {
    const player: any = audioPlayerRef.current;
    if (player) {
      player?.pause();
    }
  };

  const handleIssueModal = () => {
    setShowIssueModal(true);
  };

  const hasAnyError = () => {
    const findIssuesElement = document.querySelector('.fa-exclamation-triangle');
    if (findIssuesElement) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="tred_wrapper_root">
        <div className="tred_main_container">
          {!loading && (
            <div className="tred_header_tools">
              <h3>
                <i className="fas fa-language mr-1" />
                {jobData.length && <span>{String(get(jobData[0], 'target-language-code-3')).toUpperCase()}</span>}
                {jobData.length && <span>{get(jobData[0], 'source-file.date-code')}</span>}
              </h3>
              {mode === EditorMode.edit && (
                <div className="editor-tools-container">
                  <EditorTopTools captionSelected={captionSelected} selected={activeCaptionTools as any} />
                </div>
              )}
              <div className="job-save-button">
                <button className=" btn btn-light float-end" disabled={saveClicked} onClick={handleSaveClick}>
                  {saveClicked ? (
                    <i className="fa fa-spinner animationRotate" aria-hidden="true" />
                  ) : (
                    hasAnyError() && <i className="fas fa-exclamation-triangle" />
                  )}
                  &nbsp; Save Translation Job
                </button>
              </div>
            </div>
          )}
          <div ref={mainContentRef} className="tred_main">
            {loading ? (
              <Spinner />
            ) : (
              <>
                {!!jobData.length &&
                  jobData[0].blocks.map((item: Block, blockIndex: number) => (
                    <EditorRow
                      key={blockIndex}
                      editorValue={editorValues[blockIndex]}
                      captionSelected={captionSelected || ({pairIndex: 0, blockIndex: 0} as ISelectedCaption)}
                      blockIndex={blockIndex}
                      selected={selected[blockIndex]}
                      editorMode={mode}
                      chatModal={showModal}
                      subTitlePairs={item['subtitle-pairs']}
                      audio={item.audio}
                      elementType={item.type}
                      classes={item.classes}
                      blocksLength={jobData[0].blocks.length}
                      audioPlayed={audioPlayed}
                      block={item}
                      playAudio={handlePlayAudio}
                      pauseAudio={handlePauseAudio}
                      handleCaption={handleCaption}
                      handleCurentActiveTools={handleSelect}
                      handleEditor={handleEditor}
                      handleBlur={() => {}}
                      handleFocus={() => {}}
                      handleChatModal={() => setShowModal(true)}
                      setAudioPlayed={setAudioPlayed}
                    />
                  ))}
                <hr />
                <JobBio
                  jobIdComponent={
                    <h3>
                      {jobData.length && <span>{String(get(jobData[0], 'target-language-code-3')).toUpperCase()}</span>}
                      {jobData.length && <span>{get(jobData[0], 'source-file.date-code')}</span>}
                    </h3>
                  }
                  sourceFile={jobData.length ? jobData[0]['source-file'] : {}}
                  targetFile={jobData.length ? jobData[0]['target-file'] : {}}
                />
              </>
            )}
          </div>
        </div>
        <div className="tred_sidebar">
          {!loading && <SidebarTopButtons mode={mode} handleMode={handleMode} />}
          <Sidebar
            handleReset={handleReset}
            ref={mainContentRef}
            setTop={handleTopCaptionSelect}
            setBottom={handleBottomCaptionSelect}
            editMode={mode}
            captionInfo={!!jobData.length ? jobData[0].blocks[captionSelected.blockIndex] : {}}
            jobData={jobData}
            selectedCaption={captionSelected}
            allJobData={allJobData}
            blockIndex={captionSelected.blockIndex}
            pairIndex={captionSelected.pairIndex}
            loading={loading}
            editorInstance={editorInstance}
          />
        </div>
      </div>
      <Toasters />
      <>
        {!loading && (
          <>
            <TooltipError id="tooltipError" editorMode={mode} audioPlayedFrom={audioPlayedFrom} />
            <Tooltip id="markTooltip" audioPlayedFrom={audioPlayedFrom} />
            <WarningTooltip id="warningTooltip" />
            <ChatTooltip id="commentMsg" />
          </>
        )}
        <Modal
          name={`Edit Issue ${getIssueByKey('display-number', jobData, captionSelected)}`}
          showIcon
          externalClass="modal-dailog-right"
          id="editIssue"
          footer={
            <>
              <button type="submit" className="btn btn-primary" onClick={triggetUpdateIssueForm}>
                Update Issue
              </button>
              <button type="button" className="btn btn-light" onClick={closeIssuesModal}>
                Cancel
              </button>
            </>
          }>
          {showIssueModal && (
            <IssueForm
              assignees={getDataFromEntities(allJobData, IssuesTypes.issueAssigneeId)}
              issueTypes={getDataFromEntities(allJobData, IssuesTypes.issueTypeClass)}
            />
          )}
        </Modal>
        <Modal
          name={getIssueByKey('number-and-title', jobData, captionSelected)}
          showIcon
          externalClass="modal-dailog-right"
          id="chatting">
          {showModal && (
            <Chatting
              editorValue={editorValues[captionSelected.blockIndex][captionSelected.pairIndex]}
              selectedCaption={captionSelected}
              handleEditor={handleEditor}
              selected={selected[captionSelected.blockIndex][captionSelected.pairIndex]}
              fireResolutionIssues={getDataFromEntities(allJobData, IssuesTypes.issueFireResolution)}
              handleSelect={handleSelect}
              handleIssueModal={handleIssueModal}
            />
          )}
        </Modal>
        <Modal name="Edit caption" id="editCaption" externalClass="modal-dialog-centered modal-custom-width">
          {!loading && mode === EditorMode.review && (
            <EditPerticularCaption
              editor={editorInstance}
              captionSelected={captionSelected}
              selected={selected[captionSelected.blockIndex][captionSelected.pairIndex]}
              editorValue={editorValues[captionSelected.blockIndex]}
              chatModal={showModal}
              subTitlePair={jobData[0].blocks[captionSelected.blockIndex]['subtitle-pairs'][captionSelected.pairIndex]}
              subTitlePairLength={jobData[0].blocks[captionSelected.blockIndex]['subtitle-pairs'].length}
              subTitlePairs={jobData[0].blocks[captionSelected.blockIndex]['subtitle-pairs']}
              blocksLength={jobData[0].blocks.length}
              elementType={jobData[0].blocks[captionSelected.blockIndex].type}
              classes={jobData[0].blocks[captionSelected.blockIndex].classes}
              audioPlayed={audioPlayed}
              block={jobData[0].blocks}
              playAudio={handlePlayAudio}
              pauseAudio={handlePauseAudio}
              handleCaption={handleCaption}
              handleEditor={handleEditor}
              handleCurentActiveTools={handleSelect}
              handleChatModal={() => setShowModal(true)}
              setAudioPlayed={setAudioPlayed}
            />
          )}
        </Modal>
      </>
      {jobData.length > 0 && (
        <audio id="audioPlayer" controls ref={audioPlayerRef}>
          <source src={jobData[0]['source-file']['audio-file-url']} type="audio/mp4" />
          Your browser does not support the audio element.
        </audio>
      )}
    </>
  );
};

export default Editor;
