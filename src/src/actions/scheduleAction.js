import * as types from './types';


export const loadFetchedSchedule = input => ({
  type: types.LOAD_FETCHED_SCHEDULE,
  payload: input,
});


export const clearSchedule = () => ({ type: types.CLEAR_SCHEDULE });


export const updateDaySchedule = (dayName, daySchedule) => ({
  type: types.UPDATE_DAY,
  payload: {
    key: dayName,
    value: daySchedule,
  },
});
