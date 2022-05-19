import {handleEditorToolsButton} from 'components/editorTopTools';
import {useEffect} from 'react';
import {store} from 'redux/store';
import {ui_setSelectedCaption} from 'redux/uiSlice';
import {ISelectedCaption} from 'types';

export const incrementCaption = (jobData: any, blockIndex: number, pairIndex: number) => {
  if (jobData[0].blocks[blockIndex]['subtitle-pairs'].length - 1 > pairIndex) {
    store.dispatch(ui_setSelectedCaption({blockIndex, pairIndex: pairIndex + 1}));
  } else if (jobData[0].blocks.length - 1 > blockIndex) {
    store.dispatch(ui_setSelectedCaption({blockIndex: blockIndex + 1, pairIndex: 0}));
  }
};

export const decrementCaption = (jobData: any, blockIndex: number, pairIndex: number) => {
  if (jobData[0].blocks[blockIndex]['subtitle-pairs'].length > pairIndex && pairIndex > 0) {
    store.dispatch(ui_setSelectedCaption({blockIndex, pairIndex: pairIndex - 1}));
  } else {
    store.dispatch(
      ui_setSelectedCaption({
        blockIndex: blockIndex - 1,
        pairIndex: jobData[0].blocks[blockIndex - 1]['subtitle-pairs'].length - 1,
      }),
    );
  }
};

export const useKeyboardInputs = (jobData: any, selectedCaption: ISelectedCaption) => {
  const {blockIndex, pairIndex} = selectedCaption;
  const playButton: HTMLElement | null = document.querySelector(`#playButton-${blockIndex}-${pairIndex}`);
  const handleKeyDown = (e: any) => {
    if (e.code === 'Tab') {
      incrementCaption(jobData, blockIndex, pairIndex);
    }
    if (e.shiftKey && e.code === 'Tab') {
      decrementCaption(jobData, blockIndex, pairIndex);
    }
    if (e.shiftKey && e.altKey && e.code === 'KeyA' && playButton) {
      playButton?.click();
    }
    if (e.altKey && e.code === 'KeyB') {
      handleEditorToolsButton('bold', selectedCaption);
    }
    if (e.altKey && e.code === 'KeyI') {
      handleEditorToolsButton('italic', selectedCaption);
    }
    if (e.altKey && e.code === 'KeyU') {
      handleEditorToolsButton('underline', selectedCaption);
    }
  };

  useEffect(() => {
    if (jobData.length) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [jobData, selectedCaption]);
};
