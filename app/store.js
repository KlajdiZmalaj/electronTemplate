import {
  createStore,
  applyMiddleware,
  combineReducers,
  // compose
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer as AuthReducer } from './models/auth';

const rootReducer = combineReducers({
  auth: AuthReducer,
  // prematch: PrematchReducer,
  // live: LiveReducer,
  // coupon: CouponReducer,
  // common: CommonReducer,
  // games: GamesReducer,
});

export default function configureStore() {
  const loggerMiddleware = (store) => (next) => (action) => {
    const returnValue = next(action);

    // if (console.group) {
    //   console.group(action.type);
    //   console.log("%c action", "color: #03A9F4", action);
    //   console.log("%c newState", "color: #03A9F4", store.getState());
    //   console.groupEnd();
    // }

    return returnValue;
  };

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleware];
  return {
    ...createStore(
      rootReducer,
      // compose(
      applyMiddleware(...middlewares)
      // window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //   window.__REDUX_DEVTOOLS_EXTENSION__()
      // )
    ),
    runSaga: sagaMiddleware.run,
  };
}
