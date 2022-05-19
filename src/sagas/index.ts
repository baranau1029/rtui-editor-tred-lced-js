import {all} from 'redux-saga/effects';

import {homeSaga} from './saga';

export default function* rootSaga() {
  yield all([...homeSaga]);
}
