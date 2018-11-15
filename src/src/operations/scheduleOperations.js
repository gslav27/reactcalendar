import * as scheduleActions from '../actions/scheduleAction';
import staticData from '../utilities/staticData';


export const { clearSchedule } = scheduleActions;


export const updateWholeDaySchedule = dayName => (dispatch, getState) => {
  const daySchedule = [...getState().schedule[dayName]];
  daySchedule.fill(~daySchedule.indexOf(0) ? 1 : 0);
  dispatch(scheduleActions.updateDaySchedule(dayName, daySchedule));
};


export const updateDaysHour = (dayName, hour) => (dispatch, getState) => {
  const daySchedule = [...getState().schedule[dayName]];
  daySchedule[hour] = daySchedule[hour] ? 0 : 1;
  return dispatch(scheduleActions.updateDaySchedule(dayName, daySchedule));
};


const transformScheduleForClient = (schedule) => {
  const transformedSchedule = {};
  const { factor } = staticData;
  Object.keys(schedule).forEach((day) => {
    const d = day.toUpperCase();
    transformedSchedule[d] = Array(staticData.hours).fill(0);
    schedule[day].forEach((minutes) => {
      const start = minutes.bt / factor;
      const end = (minutes.et + 1) / factor;
      const duration = end - start;
      transformedSchedule[d].splice(start, duration, ...Array(duration).fill(1));
    });
  });
  return transformedSchedule;
};


const transformScheduleForServer = (schedule) => {
  const transformDay = (arr) => {
    const scheduleArr = [];
    const { factor } = staticData;
    const updateScheduleArr = (minutes) => {
      const lastSchedulePeriod = scheduleArr[scheduleArr.length - 1];
      (minutes - lastSchedulePeriod.et === 1)
        ? lastSchedulePeriod.et += factor
        : scheduleArr.push({ bt: minutes, et: minutes + (factor - 1) });
    };
    arr
      .map((reserved, i) => (reserved ? i : -1))
      .filter(reserved => ~reserved)
      .forEach((hour, i) => {
        !i
          ? scheduleArr[0] = { bt: hour * factor, et: hour * factor + (factor - 1) }
          : updateScheduleArr(hour * factor);
      });
    return scheduleArr;
  };
  return (
    Object.keys(schedule)
      .reduce((acc, key) => {
        acc[key.toLowerCase()] = transformDay(schedule[key]);
        return acc;
      }, {})
  );
};


export const fetchSchedule = () => (dispatch) => {
  // example of Schedule fetching from fake server
  fetch(`https://my-json-server.typicode.com/gslav27/fakeJsonServer/reactCalendar`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((response) => {
      dispatch(scheduleActions.loadFetchedSchedule(transformScheduleForClient(response)));
    })
    .catch((error) => {
      console.log('There has been a problem with fetching calendar schedule: ', error.message);
    });
};


export const saveSchedule = () => (_, getState) => {
  const deepClonedSchedule = JSON.parse(JSON.stringify(getState().schedule));
  const output = JSON.stringify(transformScheduleForServer(deepClonedSchedule));
  console.log('OUTPUT = ', output);

  // example of Schedule saving on fake server
  const obj = {
    method: 'PUT',
    body: output,
  };
  fetch(`https://my-json-server.typicode.com/gslav27/fakeJsonServer/reactCalendar`, obj)
    .then((response) => {
      if (response.ok) {
        console.log('Saved, status', response.status);
      }
    })
    .catch((error) => {
      console.log('There has been a problem with saving calendar schedule: ', error.message);
    });
  return {};
};
