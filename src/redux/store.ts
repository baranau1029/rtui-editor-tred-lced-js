import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createReducer} from 'redux-orm';
import createSagaMiddleware, {END} from 'redux-saga';
import {createHashHistory} from 'history';
import {routerMiddleware} from 'react-router-redux';
import {createLogger} from 'redux-logger';
import {jobReducer} from './slice';

import orm from '../orm';
import rootSaga from '../sagas';
import {UiReducer} from './uiSlice';

const middlewares = [];

export const history = createHashHistory();
const routeMiddleware = routerMiddleware(history);
const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();
middlewares.push(sagaMiddleware);
middlewares.push(routeMiddleware);
middlewares.push(logger);

const rootReducer = combineReducers({
  orm: createReducer(orm),
  job: jobReducer,
  ui: UiReducer,
});

export const store: any = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

store.close = () => store.dispatch(END);

export default store;
