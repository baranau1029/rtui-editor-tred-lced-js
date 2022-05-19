import {PayloadAction} from '@reduxjs/toolkit';
import {put, takeEvery, takeLatest} from 'redux-saga/effects';
import store from '../redux/store';
import {job_loadRequest, JobRequest, job_activate, job_loadFailure, job_loadSuccess, Job} from '../redux/slice';
import {actionTypes} from '../services/actionTypes';
import {flagForReviewAPIcalll, getTranslationDataAPIcall, saveJob, updateIssueAPIcall} from 'services/api.translation';
import {Pair} from 'services/api.interfaces';
import {deserialize} from 'helper/htmlDeserialize';
import {ui_loadEditorAndTools, ui_setLoadingState} from 'redux/uiSlice';
import {extractTools} from 'helper/extractTools';

function* job_loadRequestHandler(action: PayloadAction<JobRequest>) {
  try {
    const job = action.payload.data['sg-entities'];
    if (job?.length) {
      const editorInitialValues = job[0].blocks.map((item: any) => {
        return item['subtitle-pairs'].map((subItem: Pair) => {
          const document = new window.DOMParser().parseFromString(subItem.target.html, 'text/html');
          const result = deserialize(document.body);
          return result;
        });
      });

      const initialEditorSelectedTools = job[0].blocks.map((item: any) => {
        return item['subtitle-pairs'].map((subItem: any) => {
          return extractTools(subItem.target.html);
        });
      });
      yield put(job_loadSuccess({data: action.payload.data}));
      yield put(ui_loadEditorAndTools({editorInitialValues, initialEditorSelectedTools}));
      yield put(ui_setLoadingState(action.payload.loader));
    }
  } catch (error) {
    console.log(error);
    yield put(job_loadFailure({error}));
  }
}

function* job_loadSuccessHandler(_action: PayloadAction<any>) {
  const job = _action.payload.data['sg-entities'];
  if (job.length) {
    store.dispatch({type: actionTypes.UPSERT_JOB, payload: job[0]});
  }

  yield true;
}

export const getJob = (state: any) => state.job as Job;

function* job_subtitleUpdated(_action: PayloadAction<any>): any {}

export function* watchExperience() {
  yield takeEvery(job_activate.type, getTranslationDataAPIcall);
  yield takeEvery(job_loadRequest.type, job_loadRequestHandler);
  yield takeEvery(job_loadSuccess.type, job_loadSuccessHandler);
  yield takeEvery(actionTypes.UPDATE_SUBTITLES, job_subtitleUpdated);
  yield takeLatest(actionTypes.FLAG_FOR_REVIEW, flagForReviewAPIcalll);
  yield takeLatest(actionTypes.UPDATE_ISSUE, updateIssueAPIcall);
  yield takeLatest(actionTypes.SAVE_JOB, saveJob);
}

export const homeSaga = [
  takeEvery(job_activate.type, getTranslationDataAPIcall),
  takeEvery(job_loadRequest.type, job_loadRequestHandler),
  takeEvery(job_loadSuccess.type, job_loadSuccessHandler),
  takeEvery(actionTypes.UPDATE_SUBTITLES, job_subtitleUpdated),
  takeLatest(actionTypes.FLAG_FOR_REVIEW, flagForReviewAPIcalll),
  takeLatest(actionTypes.UPDATE_ISSUE, updateIssueAPIcall),
  takeLatest(actionTypes.SAVE_JOB, saveJob),
];
