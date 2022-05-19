import React, {memo, useCallback, useMemo} from 'react';
import classNames from 'classnames';
import {Editable, Slate, withReact} from 'slate-react';
import {Element, HOTKEYS, Leaf, toggleMark} from './editorTools';
import isHotkey from 'is-hotkey';
import {withHistory} from 'slate-history';
import {createEditor, Editor, Editor as EditorInstance, Transforms} from 'slate';
import './style.scss';
import Tools from './tools';
import RowTools from './rowTools';
import {Attachment, Audio2, Block, Pair} from 'services/api.interfaces';
import {useDispatch} from 'react-redux';
import {ui_setAudioPlayFrom, ui_setCaptionActiveTools, ui_setIssues} from 'redux/uiSlice';
import {withSingleLine} from 'hooks/useSingleLine';
import {actionTypes} from 'services/actionTypes';
import allAccentsCharacters from 'util/specialCharacters';
import {cloneDeep} from 'lodash';

export const shouldShowCommentIcon = (issuesAttachments: Attachment[]) => {
  if (issuesAttachments.length) {
    if (issuesAttachments[0].issue['issue-comments'].length) {
      return true;
    }
    return false;
  }
  return false;
};

export enum EditorMode {
  edit = 'edit',
  review = 'review',
}
interface SubtitlePairsProps {
  isActive: boolean;
  index: number | string;
  editorValue: any;
  selected: any;
  editorMode: EditorMode;
  chatModal: boolean;
  pair: Pair;
  audio: Audio2;
  elementType: string;
  blockIndex: number;
  pairIndex: number;
  classes: string[];
  issuesAttachments: Attachment[];
  completionStatus: string;
  blockPairsLength: number;
  blocksLength: number;
  audioPlayed: boolean;
  subTitlePairs: Pair[];
  blockEditorValue: any;
  block: Block;
  handleCaption: (editor: any, blockIndex: number, pairIndex: number) => void;
  handleEditor: (value: any) => void;
  handleBlur: () => void;
  handleFocus: () => void;
  handleCurentActiveTools: (value: any, i: number) => void;
  handleChatModal: () => void;
  playAudio: (audio: Audio2) => void;
  pauseAudio: () => void;
  setAudioPlayed: (value: boolean) => void;
}

let oldPath = [0, 0];
let oldOffset = 0;

const SubtitlePairs = ({
  isActive,
  editorValue,
  index,
  selected,
  editorMode,
  chatModal,
  pair,
  elementType,
  blockIndex,
  pairIndex,
  audio,
  classes,
  issuesAttachments,
  blockPairsLength,
  blocksLength,
  audioPlayed,
  subTitlePairs,
  blockEditorValue,
  block,
  handleCaption,
  handleEditor,
  handleBlur,
  handleFocus,
  handleCurentActiveTools,
  handleChatModal,
  playAudio,
  pauseAudio,
  setAudioPlayed,
}: SubtitlePairsProps): JSX.Element => {
  const dispatch = useDispatch();
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withSingleLine(withReact(createEditor() as any))), []);
  editor.children = editorValue;

  const setCaptionActionTools = () => {
    dispatch(ui_setCaptionActiveTools([]));
    if (editor) {
      const toolsObj: any = Editor.marks(editor);
      if(toolsObj){
        const tools = Object.keys(toolsObj);
        dispatch(ui_setCaptionActiveTools(tools));
      }
    }
  };

  const handleSelection = () => {
    dispatch(ui_setAudioPlayFrom(audio));
    if (!isActive) {
      handleCaption(editor, blockIndex, pairIndex);
    }
    setCaptionActionTools();
  };

  const handleChattingModal = () => {
    dispatch(ui_setIssues(issuesAttachments));
    handleChatModal();
  };

  const handleChange = (value: any) => {
    let newValue = value;
    const nodeIndex = editor.selection.focus.path[0];
    const childrenIndex = editor.selection.focus.path[1];
    const preText = editor.children[nodeIndex].children[childrenIndex];
    oldPath = editor.selection.focus.path;
    oldOffset = editor.selection.focus.offset;
    const accentChars = Object.keys(allAccentsCharacters);

    accentChars.forEach((key: any) => {
      if (preText.text.includes(key)) {
        const newString = preText.text.replace(key, allAccentsCharacters[key]);
        const allNodes = cloneDeep(editor.children);
        allNodes[nodeIndex].children[childrenIndex].text = newString;
        Transforms.delete(editor, {
          at: {
            anchor: EditorInstance.start(editor, []),
            focus: EditorInstance.end(editor, []),
          },
        });
        Transforms.insertNodes(editor, allNodes, {
          at: [0],
        });
        Transforms.select(editor, {path: oldPath, offset: oldOffset - 2});
        newValue = allNodes;
      }
    });

    const editorValues = editor.children;
    const validations = pair.validations;
    const gapMarks = validations['gap-marks'].source;
    const eagleMarks = validations['eagles'].source;
    let countGapMark = 0;
    let countEagleMark = 0;
    let isParagraphNumberExist = null;

    if (pair.source.html.includes('rtui-ial-class-pn')) {
      newValue.forEach((child: any) => {
        const isParagraphNumberFound = child.children.filter((leaf: any) => leaf?.number);
        if (isParagraphNumberFound.length) {
          isParagraphNumberExist = true;
        } else {
          isParagraphNumberExist = false;
        }
      });

      if (isParagraphNumberExist === false) {
        dispatch({type: actionTypes.UPDATE_PARAGRAPH_MARK, payload: {blockIndex, pairIndex, jobId: 0, valid: false}});
      } else if (isParagraphNumberExist) {
        dispatch({type: actionTypes.UPDATE_PARAGRAPH_MARK, payload: {blockIndex, pairIndex, jobId: 0, valid: true}});
      }
    }

    editorValues.forEach((child: any) => {
      child.children.forEach((leaf: any) => {
        if (leaf.text === '%') {
          countGapMark += 1;
        } else if (leaf.text === '') {
          countEagleMark += 1;
        }
      });
    });

    if (countGapMark < gapMarks) {
      dispatch({
        type: actionTypes.UPDATE_GAP_MARK_DIRECTLY,
        payload: {blockIndex, pairIndex, jobId: 0, count: countGapMark},
      });
    }

    if (countEagleMark < eagleMarks) {
      dispatch({
        type: actionTypes.UPDATE_EAGLE_MARK_DIRECTLY,
        payload: {blockIndex, pairIndex, jobId: 0, count: countEagleMark},
      });
    }
    handleEditor(newValue);
  };

  return (
    <div className={classNames('tred_row', {tred_row_active: isActive})} onClick={handleSelection}>
      <div
        className={`tred_row_col_source rtui-block-el-${elementType}`}
        dangerouslySetInnerHTML={{__html: pair.source.html}}></div>
      <div
        aria-disabled={true}
        className={classNames('tred_row_col_translate', `rtui-block-el-${elementType}`, {
          tred_row_col_translate_active: isActive,
          tred_row_col_active: isActive,
          tred_row_col_translate_disabled: !isActive,
        })}>
        <Slate editor={editor} value={editorValue} onChange={handleChange}>
          <Tools index={index} selected={selected} handleCurentActiveTools={handleCurentActiveTools} />
          <Editable
            value={editorValue}
            className={`editor editor-${index}`}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onBlur={handleBlur}
            spellCheck
            autoFocus={isActive}
            onKeyDown={(event) => {
              if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.code)) {
                setCaptionActionTools();
              }
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
          />
        </Slate>
      </div>
      <div className={classNames('tred_row_col_tool', {has_warnings: !isActive})}>
        {shouldShowCommentIcon(issuesAttachments) && (
          <span>
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
                issuesAttachments.length ? issuesAttachments[0].issue['display-number'] : ''
              } To demonstrate issues"`}
              onClick={handleChattingModal}>
              <i className="fas fa-comment-exclamation " /> 1
            </button>
          </span>
        )}
        <span></span>
        <RowTools
          index={index}
          isActive={isActive}
          audio={audio}
          validations={pair.validations}
          otherValidationData={{eleType: pair['block-el'], status: pair['completion-status'], classes}}
          elementType={elementType}
          isCompleted={pair['completion-status']}
          blockIndex={blockIndex}
          pairIndex={pairIndex}
          blocksLength={blocksLength}
          blockPairsLength={blockPairsLength}
          editor={editor}
          audioPlayed={audioPlayed}
          editorMode={editorMode}
          handleCaption={handleCaption}
          playAudio={playAudio}
          pauseAudio={pauseAudio}
          handleSelection={handleSelection}
          setAudioPlayed={setAudioPlayed}
        />
      </div>
    </div>
  );
};

function areEqual(prevProps: any, nextProps: any) {
  if (
    prevProps.isActive === nextProps.isActive &&
    prevProps.completionStatus === nextProps.completionStatus &&
    prevProps.editorValue === nextProps.editorValue &&
    prevProps.audioPlayed === nextProps.audioPlayed &&
    prevProps.editorMode === nextProps.editorMode
  ) {
    return true;
  } else {
    return false;
  }
}

export default memo(SubtitlePairs, areEqual);
