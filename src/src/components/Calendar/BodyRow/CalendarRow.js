import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import AllDayButton from '../../Buttons/AllDayButton/AllDayButton';
import HourButtons from '../../Buttons/HourButtons/HourButtons';

class CalendarRow extends Component {
  shouldComponentUpdate(prevProps) {
    return !lodash.isEqual(prevProps.currentDaySchedule, this.props.currentDaySchedule);
  }

  render() {
    const { currentDaySchedule, day, ...restProps } = this.props;
    return (
      <div>
        <div
          className={`dayName${~currentDaySchedule.indexOf(1) ? ' checked' : ''}`}
        >
          {day}
        </div>
        <AllDayButton
          onClick={() => restProps.onDayButtonClick(day)}
          isChecked={!~currentDaySchedule.indexOf(0)}
        />
        <HourButtons
          currentDaySchedule={currentDaySchedule}
          onChange={(e, i) => restProps.onHourButtonEvent(e, day, i)}
        />
      </div>
    );
  }
}

CalendarRow.propTypes = {
  currentDaySchedule: PropTypes.arrayOf(PropTypes.number),
  day: PropTypes.string.isRequired,
};


CalendarRow.defaultProps = { currentDaySchedule: [0] };


export default CalendarRow;
