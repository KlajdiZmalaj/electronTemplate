import { takeLatest, all } from 'redux-saga/effects';

/* ------------- Types ------------- */

import { AuthTypes } from '../models/auth';
// import { GamesTypes } from "../models/games";

/* ------------- Sagas ------------- */
import { getData } from './AuthSagas';

export default function* root() {
  yield all([
    // AUTH
    takeLatest(AuthTypes.GET_DATA, getData),
  ]);
}
