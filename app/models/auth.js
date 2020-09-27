import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
  getData: ['p1', 'p2'],
  setData: ['data'],
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
  data: [],
};

export const reducer = createReducer(INITIAL_STATE, {
  //   [Types.LOG_OUT]: () => ({ ...INITIAL_STATE }),
  [Types.SET_DATA]: (state, { data }) => {
    return {
      ...state,
      data,
    };
  },
});
