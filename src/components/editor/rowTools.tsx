import classNames from 'classnames';
import {hasCaptionError} from 'helper/captionValidation';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import {ui_setValidations, ui_setOtherValidations} from 'redux/uiSlice';
import {actionTypes} from 'services/actionTypes';
import {Audio2, Validations} from 'services/api.interfaces';
import {JobStatus} from 'services/enums';
import {showToastMessage} from '../../helper/toastMessages';
import {EditorMode} from './subtitlePairs';

export interface classesTypes {
  eleType: string;
  classes: string[];
  status: string;
}
interface RowToolsProps {
  index: number | string;
  isActive: boolean;
  audio: Audio2;
  elementType: string;
  validations: Validations;
  otherValidationData: classesTypes | null;
  isCompleted?: string;
  blockIndex: number;
  pairIndex: number;
  blockPairsLength: number;
  blocksLength: number;
  editor: any;
  audioPlayed: boolean;
  editorMode: EditorMode;
  handleCaption: (editor: any, blockIndex: number, pairIndex: number) => void;
  playAudio: (audio: Audio2) => void;
  pauseAudio: () => void;
  handleSelection: () => void;
  setAudioPlayed: (value: boolean) => void;
}

const RowTools = ({
  index,
  isActive,
  audio,
  elementType,
  editorMode,
  validations,
  otherValidationData,
  isCompleted,
  blockIndex,
  pairIndex,
  blocksLength,
  blockPairsLength,
  editor,
  audioPlayed,
  handleCaption,
  playAudio,
  pauseAudio,
  setAudioPlayed,
  handleSelection,
}: RowToolsProps) => {
  const dispatch = useDispatch();
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setPlayed(false);
    }
  }, [isActive]);

  const handlePlay = (e?: any) => {
    if (editorMode === EditorMode.edit) {
      if (!played) {
        setPlayed(true);
        setAudioPlayed(true);
        playAudio(audio);
      } else {
        setPlayed(false);
        setAudioPlayed(false);
        pauseAudio();
      }
    } else {
      setAudioPlayed(!audioPlayed);
      if (!audioPlayed) {
        playAudio(audio);
      } else {
        pauseAudio();
      }
    }
  };

  const handleWarningMouseEnter = () => {
    dispatch(ui_setValidations(validations));
    ReactTooltip.rebuild();
  };

  const handleErrorMouseEnter = () => {
    dispatch(ui_setOtherValidations({validations, otherValidationData, audio}));
    ReactTooltip.rebuild();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleMarkUnmark = (e?: any) => {
    if (isActive && editorMode === EditorMode.edit) {
      e && e.preventDefault();
      if (!hasCaptionError(validations)) {
        dispatch({type: actionTypes.TOGGLE_PAIR_COMPLETION_STATUS, payload: {jobId: 0, blockIndex, pairIndex}});
      }
      if (pairIndex < blockPairsLength - 1 && isCompleted === JobStatus.pending && !hasCaptionError(validations)) {
        handleCaption(editor, blockIndex, pairIndex + 1);
      } else if (hasCaptionError(validations)) {
        showToastMessage('captionError', '');
      }
      if (
        blockIndex < blocksLength - 1 &&
        pairIndex === blockPairsLength - 1 &&
        isCompleted === JobStatus.pending &&
        !hasCaptionError(validations)
      ) {
        handleCaption(editor, blockIndex + 1, 0);
      } else if (hasCaptionError(validations)) {
        showToastMessage('captionError', '');
      }
    }
  };

  useEffect(() => {
    const handleKeydown = (e: any) => {
      if (e.altKey && e.code === 'Enter') {
        toggleMarkUnmark();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [isActive, toggleMarkUnmark]);

  let completionStatus = isCompleted === JobStatus.completed;

  return (
    <div className="d-flex">
      <span>
        {validations.repositext.warnings.length > 0 && (
          <i
            data-tip
            data-for="warningTooltip"
            className="far fa-exclamation-triangle fa-lg warnings"
            onMouseEnter={handleWarningMouseEnter}
          />
        )}
        <br />
        {!!validations['block-boundaries'].source && (
          <i
            data-toggle="tooltip"
            data-placement="right"
            title="There is a paragraph break after this caption"
            className="far fa-paragraph fa-lg text-gray para-space"
          />
        )}
      </span>
      <span>
        {hasCaptionError(validations) && (
          <i
            data-tip
            data-for="tooltipError"
            className="far fa-exclamation-triangle fa-lg error"
            onMouseEnter={handleErrorMouseEnter}
          />
        )}
        {!hasCaptionError(validations) && (
          <span className="marker-tooltip">
            <i
              className={`fa-lg ${completionStatus ? 'fas text-green' : 'far text-light-gray'} align-top circle-mark ${
                completionStatus ? 'fa-check-circle' : 'fa-circle'
              }`}
              data-tip
              onMouseEnter={handleErrorMouseEnter}
              onClick={toggleMarkUnmark}
              data-for="markTooltip"
            />
          </span>
        )}
        <br />
        {editorMode === EditorMode.edit ? (
          <i
            id={`playButton-${blockIndex}-${pairIndex}`}
            className={classNames(`fas ${played && isActive ? 'fa-pause' : 'fa-play'} fa-lg play-audio`, {
              'd-block': isActive,
            })}
            data-toggle="tooltip"
            data-placement="right"
            title="Start audio playback"
            onClick={handlePlay}
          />
        ) : (
          <i
            id={`playButton-${blockIndex}-${pairIndex}`}
            className={classNames(`fas ${audioPlayed ? 'fa-pause' : 'fa-play'} fa-lg play-audio`, {})}
            data-toggle="tooltip"
            data-placement="right"
            title="Start audio playback"
            onClick={handlePlay}
          />
        )}
      </span>
    </div>
  );
};

export default RowTools;
