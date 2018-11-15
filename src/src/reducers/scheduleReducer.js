import * as types from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOAD_FETCHED_SCHEDULE:
      return {
        ...state,
        ...action.payload,
      };
    case types.UPDATE_DAY:
      return {
        ...state,
        ...{ [action.payload.key]: action.payload.value },
      };
    case types.CLEAR_SCHEDULE:
      return Object.keys(state).reduce((acc, key) => { acc[key] = Array(state[key].length).fill(0); return acc; }, {});
    default:
      return state;
  }
}
