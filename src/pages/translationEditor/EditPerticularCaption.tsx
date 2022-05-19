import SubtitlePairs, {EditorMode} from 'components/editor/subtitlePairs';
import EditorTopTools from 'components/editorTopTools';
import React from 'react';
import {Audio2, Block, Pair} from 'services/api.interfaces';
import {ISelectedCaption} from 'types';

interface Props {
  editor: any;
  captionSelected: ISelectedCaption;
  selected: any;
  editorValue: any;
  chatModal: boolean;
  subTitlePair: Pair;
  elementType: string;
  subTitlePairLength: number;
  classes: string[];
  blocksLength: number;
  audioPlayed: boolean;
  subTitlePairs: Pair[];
  block: Block;
  playAudio: (audio: Audio2) => void;
  pauseAudio: () => void;
  handleCaption: (editor: any, blockIndex: number, pairIndex: number) => void;
  handleEditor: (value: any) => void;
  handleCurentActiveTools: (value: any, i: number) => void;
  handleChatModal: () => void;
  setAudioPlayed: (value: boolean) => void;
}

const EditPerticularCaption = ({
  editor,
  captionSelected,
  selected,
  editorValue,
  chatModal,
  subTitlePair,
  elementType,
  subTitlePairLength,
  classes,
  blocksLength,
  audioPlayed,
  subTitlePairs,
  block,
  playAudio,
  pauseAudio,
  handleCaption,
  handleEditor,
  handleCurentActiveTools,
  setAudioPlayed,
  handleChatModal,
}: Props) => {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <EditorTopTools captionSelected={captionSelected} selected={selected} />
      <div className="mt-4" />
      <SubtitlePairs
        key={captionSelected.pairIndex}
        editorValue={editorValue[captionSelected.pairIndex]}
        blockEditorValue={editorValue}
        isActive={true}
        index={`${captionSelected.blockIndex}${captionSelected.pairIndex}`}
        selected={selected}
        editorMode={EditorMode.review}
        chatModal={chatModal}
        pair={subTitlePair}
        completionStatus={subTitlePair['completion-status']}
        audio={subTitlePair.source.audio}
        elementType={elementType}
        blockIndex={captionSelected.blockIndex}
        pairIndex={captionSelected.pairIndex}
        blockPairsLength={subTitlePairLength}
        classes={classes}
        issuesAttachments={subTitlePair['issue-attachments']}
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
    </div>
  );
};

export default EditPerticularCaption;
