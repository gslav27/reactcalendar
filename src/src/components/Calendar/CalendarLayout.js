import React from 'react';
import PropTypes from 'prop-types';
import staticData from '../../utilities/staticData';
import CalendarHeader from './Header/CalendarHeader';
import CalendarRow from './BodyRow/CalendarRow';
import CalendarLayoutStyle from './CalendarLayout.style.scss';


const CalendarLayout = ({ currentSchedule, ...restProps }) => (
  <form
    id='calendar'
    className='calendar'
    onSubmit={(e) => { console.log('SUBMIT'); e.preventDefault(); }}
  >
    <CalendarHeader />
    {
      staticData.days.map(day => (
        <CalendarRow
          key={day}
          day={day}
          currentDaySchedule={currentSchedule[day]}
          {...restProps}
        />
      ))
    }
  </form>
);

CalendarLayout.propTypes = { currentSchedule: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired };

export default CalendarLayout;
