import {ISelectedCaption} from 'types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {JobStatus, SliceNames} from '../services/enums';
import {Audio2, TranslationData} from 'services/api.interfaces';

export interface Job {
  id?: string;
  state?: JobStatus;
  selectedCaption?: ISelectedCaption;
  jobData?: TranslationData;
  // mode: EditorMode;
  // editorInstance: any;
  editorValues?: any;
  selected?: Array<[]>;
  audioPlayFrom?: Audio2;
}

export interface JobActivate extends Job {
  loader?:boolean
}

export interface JobFailure extends Job {
  error: any;
}

export interface JobRequest extends Job {
  data?: any;
  loader?:boolean
}

const initialState: Job = {
  id: undefined,
  state: JobStatus.pending,
  selectedCaption: {
    blockIndex: 0,
    pairIndex: 0,
  } as ISelectedCaption,
  jobData: undefined,
  editorValues: [],
  selected: [],
  audioPlayFrom: {
    'duration-msec': 0,
    'start-msec': 0,
  },
};

const job = createSlice({
  name: SliceNames.job,
  initialState,
  reducers: {
    activate(_state, _action: PayloadAction<JobActivate>) {
      // See saga for behavior
    },
    loadFailure(_state, _action: PayloadAction<JobFailure>) {
      // See saga for behavior
    },
    loadRequest(_state, _action: PayloadAction<JobRequest>) {
      // see saga for behavior
    },
    loadSuccess(state, action: PayloadAction<any>) {
      return {
        ...state,
        jobData: action.payload.data,
        editorValues: action.payload.editorInitialValues,
        selected: action.payload.initialEditorSelectedTools,
      };
    },
    updateStoreSlice(state, action: PayloadAction<any>) {
      state = action.payload;
    }
  },
});

export const jobReducer = job.reducer;

export {initialState as jobInitialState};

export const {
  activate: job_activate,
  loadFailure: job_loadFailure,
  loadRequest: job_loadRequest,
  loadSuccess: job_loadSuccess,
  updateStoreSlice: job_updateStoreSlice,
} = job.actions;
