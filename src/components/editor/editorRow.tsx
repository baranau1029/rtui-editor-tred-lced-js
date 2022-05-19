import React, {memo} from 'react';
import './style.scss';
import {Audio, Audio2, Block, Pair} from 'services/api.interfaces';
import SubtitlePairs from './subtitlePairs';
import {ISelectedCaption} from 'types';
import ReviewMode from './reviewMode';

export enum EditorMode {
  edit = 'edit',
  review = 'review',
}
interface EditorRowProps {
  blockIndex: number;
  editorValue: any;
  selected: any;
  editorMode: EditorMode;
  chatModal: boolean;
  subTitlePairs: Pair[];
  audio: Audio;
  elementType: string;
  captionSelected: ISelectedCaption;
  classes: string[];
  blocksLength: number;
  audioPlayed: boolean;
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

const EditorRow = ({
  editorValue,
  blockIndex,
  selected,
  editorMode,
  chatModal,
  subTitlePairs,
  block,
  audio,
  elementType,
  captionSelected,
  classes,
  blocksLength,
  audioPlayed,
  handleCaption,
  handleEditor,
  handleBlur,
  handleFocus,
  handleCurentActiveTools,
  handleChatModal,
  playAudio,
  pauseAudio,
  setAudioPlayed,
}: EditorRowProps): JSX.Element => {
  if (editorMode === EditorMode.edit) {
    return (
      <>
        {subTitlePairs.map((pair: Pair, pairIndex: number) => (
          <SubtitlePairs
            key={pairIndex}
            editorValue={editorValue[pairIndex]}
            blockEditorValue={editorValue}
            isActive={`${blockIndex}${pairIndex}` === `${captionSelected.blockIndex}${captionSelected.pairIndex}`}
            index={`${blockIndex}${pairIndex}`}
            selected={selected[pairIndex]}
            editorMode={editorMode}
            chatModal={chatModal}
            pair={pair}
            completionStatus={pair['completion-status']}
            audio={pair.source.audio}
            elementType={elementType}
            blockIndex={blockIndex}
            pairIndex={pairIndex}
            blockPairsLength={subTitlePairs.length}
            classes={classes}
            issuesAttachments={pair['issue-attachments']}
            blocksLength={blocksLength}
            audioPlayed={audioPlayed}
            subTitlePairs={subTitlePairs}
            block={block}
            playAudio={playAudio}
            pauseAudio={pauseAudio}
            handleEditor={handleEditor}
            handleCaption={handleCaption}
            handleCurentActiveTools={handleCurentActiveTools}
            handleChatModal={handleChatModal}
            handleBlur={() => {}}
            handleFocus={() => {}}
            setAudioPlayed={setAudioPlayed}
          />
        ))}
      </>
    );
  }
  return (
    <ReviewMode
      block={block}
      subTitlePairs={subTitlePairs}
      blockEditorValue={editorValue}
      blockIndex={blockIndex}
      blocksLength={blocksLength}
      blockPairsLength={subTitlePairs.length}
      audioPlayed={audioPlayed}
      handleCaption={handleCaption}
      setAudioPlayed={setAudioPlayed}
      pauseAudio={pauseAudio}
      playAudio={playAudio}
      handleChatModal={handleChatModal}
    />
  );
};

export default memo(EditorRow);
