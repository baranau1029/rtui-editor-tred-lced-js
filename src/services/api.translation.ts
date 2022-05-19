import {showToastMessage} from 'helper/toastMessages';
import {put} from 'redux-saga/effects';
import {job_activate, job_loadFailure, job_loadRequest} from 'redux/slice';
import store from 'redux/store';
import {ui_saveClicked, ui_setLoadingState} from 'redux/uiSlice';
import {API} from '../util/api';
import {endpoints} from '../util/endpoints';

export function* getTranslationDataAPIcall({payload}: any) {
  yield put(ui_setLoadingState(payload.loader));
  try {
    let resp: any;
    yield API.get(
      `${endpoints.translation}fcfe9b08-8243-4aa6-b7d4-706d6518cc50/edit.json?cef=dzmitry_baranau-Dec-24-2021%3A05%3A08%3A11-Chrome-Windows-000&network-requests-stats[total]=0&network-requests-stats[succeeded]=0&network-requests-stats[failed]=0&request-id=b6892092-d994-49d6-8514-832c3862b439&translation-job-id=null`,
    ).then((res) => {
      resp = res;
    });
    if (resp) {
      yield put(job_loadRequest({data: resp.data, loader: false}));
    }
  } catch (error) {
    yield put(job_loadFailure({error}));
  }
}

export function* flagForReviewAPIcalll({attachmentId, end, data}: any): any {
  try {
    let resp: any;
    yield API.put(`${endpoints.commsIssueAttachments}/${attachmentId}/${end}`, data).then((res) => {
      resp = res;
    });
    if (resp) {
    }
  } catch (error) {}
}

export function* updateIssueAPIcall({attachmentId, data}: any): any {
  try {
    let resp: any;
    yield API.put(`${endpoints.commsIssueAttachments}/${attachmentId}`, data).then((res) => {
      resp = res;
    });
    if (resp) {
    }
  } catch (error) {}
}

export function* saveJob({data}: any): any {
  try {
    let resp: any;
    yield API.put(`${endpoints.translation}/${data['translation-job-id']}`, data).then((res) => {
      store.dispatch(ui_saveClicked(false));
      store.dispatch(job_activate({loader: false}));
      showToastMessage('jobSuccessToast', 'Your job was saved.');
      resp = res;
    });
    if (resp) {
    }
  } catch (error) {
    store.dispatch(ui_saveClicked(false));
  }
}
