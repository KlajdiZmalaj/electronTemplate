import { put, call, select, delay } from 'redux-saga/effects';
import AuthActions from '../models/auth';

import { fetchData } from '../services/auth';

export function* getData({ p1, p2 }) {
  const response = yield call(fetchData, p1, p2);
  if (response) {
    yield put(AuthActions.setData('hello'));
  }
}
