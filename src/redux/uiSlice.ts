import {ISelectedCaption} from 'types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {JobStatus, SliceNames} from '../services/enums';
import {Attachment, Audio2, Validations} from 'services/api.interfaces';
import {classesTypes} from 'components/editor/rowTools';
import {initialEditorValue} from 'data';
import {serialize} from 'helper/editorStringNormalize';
import {deserialize} from 'helper/htmlDeserialize';
import {isNumber} from 'lodash';
import store from './store';
import { actionTypes } from 'services/actionTypes';

export interface UIState {
  id?: string;
  state?: JobStatus;
  selectedCaption: ISelectedCaption;
  editorValues: any;
  selected: Array<[]>;
  captionActiveTools: Array<[]>;
  audioPlayFrom?: Audio2;
  loading: boolean;
  validation: Validations | null;
  otherValidation: classesTypes | null;
  issues: Attachment[] | null;
  blockModified: string[];
  saveClicked: boolean;
}

const initialState: UIState = {
  id: undefined,
  state: JobStatus.pending,
  selectedCaption: {
    blockIndex: 0,
    pairIndex: 0,
  } as ISelectedCaption,
  editorValues: [],
  selected: [],
  captionActiveTools: [],
  audioPlayFrom: {
    'duration-msec': 0,
    'start-msec': 0,
  },
  loading: true,
  validation: null,
  otherValidation: null,
  issues: null,
  blockModified: [],
  saveClicked: false,
};

const ui = createSlice({
  name: SliceNames.ui,
  initialState,
  reducers: {
    setLoadingState(state, action: PayloadAction<any>) {
      return {...state, loading: action.payload};
    },
    loadEditorAndTools(state, action: PayloadAction<any>) {
      state.editorValues = action.payload.editorInitialValues;
      state.selected = action.payload.initialEditorSelectedTools;
    },
    setSelectedCaption(state, action: PayloadAction<any>) {
      state.selectedCaption = action.payload;
    },
    updateSelectedTools(state: any, action: PayloadAction<any>) {
      const blockIndex = state.selectedCaption.blockIndex;
      const pairIndex = state.selectedCaption.pairIndex;
      const currentActiveTools: string[] = state.selected[blockIndex][pairIndex];
      const newToolName = action.payload.toolName;
      if (currentActiveTools.includes(newToolName)) {
        const activeToolIndex = currentActiveTools.indexOf(newToolName);
        currentActiveTools.splice(activeToolIndex, 1);
      } else {
        currentActiveTools.push(newToolName);
      }
      state.selected[blockIndex][pairIndex] = currentActiveTools;
    },
    setAudioPlayFrom(state, action: PayloadAction<any>) {
      state.audioPlayFrom = action.payload;
    },
    setValidations(state, action: PayloadAction<any>) {
      state.validation = action.payload;
    },
    setOtherValidations(state, action: PayloadAction<any>) {
      state.validation = action.payload.validations;
      state.otherValidation = action.payload.otherValidationData;
      state.audioPlayFrom = action.payload.audio;
    },
    updateEditorState(state, action: PayloadAction<any>) {
      const blockIndex = state.selectedCaption.blockIndex;
      const pairIndex = state.selectedCaption.pairIndex;
      state.editorValues[blockIndex][pairIndex] = action.payload;
    },
    setIssues(state, action: PayloadAction<any>) {
      state.issues = action.payload;
    },
    resetEditorState(state, action) {
      const blockIndex = state.selectedCaption.blockIndex;
      const pairIndex = state.selectedCaption.pairIndex;
      const document = new window.DOMParser().parseFromString(action.payload.pair.source.html, 'text/html');
      const serializeNode = deserialize(document.body);

      const onlypnGapMarkEagleMark: any = [];
      let isParagraphArise = false;

      serializeNode.forEach((node: any) => {
        if ((['%', '', ' '].includes(node.text) || +node.text >= 0) && !isParagraphArise) {
          onlypnGapMarkEagleMark.push(node);
        } else {
          isParagraphArise = true;
        }
      });

      if(!onlypnGapMarkEagleMark.length){
        onlypnGapMarkEagleMark.push({text: ''})
      }

      state.editorValues[blockIndex][pairIndex] = [
        {
          type: 'paragraph',
          children:  onlypnGapMarkEagleMark,
        },
      ];
    },
    updateBlockModified(state, action: PayloadAction<any>) {
      const key = `${action.payload.blockIndex}${action.payload.pairIndex}`;
      if (!state.blockModified.includes(key)) {
        state.blockModified.push(key);
      }
    },
    markUnmarkCompletionStatus(state, action: PayloadAction<any>) {
      state.issues = action.payload;
    },
    saveClicked(state, action: PayloadAction<any>) {
      state.saveClicked = action.payload;
    },
    setCaptionActiveTools(state, action: PayloadAction<any>) {
      state.captionActiveTools = action.payload;
    },
  },
});

export const UiReducer = ui.reducer;

export {initialState as UiInitialState};

export const {
  setLoadingState: ui_setLoadingState,
  loadEditorAndTools: ui_loadEditorAndTools,
  setSelectedCaption: ui_setSelectedCaption,
  updateSelectedTools: ui_updatedSelectedTools,
  setAudioPlayFrom: ui_setAudioPlayFrom,
  setValidations: ui_setValidations,
  setOtherValidations: ui_setOtherValidations,
  updateEditorState: ui_updateEditorState,
  resetEditorState: ui_resetEditorState,
  setIssues: ui_setIssues,
  updateBlockModified: ui_updateBlockModified,
  markUnmarkCompletionStatus: ui_markUnmarkCompletionStatus,
  saveClicked: ui_saveClicked,
  setCaptionActiveTools: ui_setCaptionActiveTools,
} = ui.actions;
