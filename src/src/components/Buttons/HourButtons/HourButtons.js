import React from 'react';
import PropTypes from 'prop-types';
import staticData from '../../../utilities/staticData';
import Button from '../ButtonTemplate';
import HourButtonsStyle from './HourButtons.style.scss';


const HourButtons = ({ currentDaySchedule, onChange }) => (
  <React.Fragment>
    {
      Array(staticData.hours).fill('').map((_, i) => {
        const handleChildEvents = (e) => {
          onChange(e, i);
        };
        return (
          <Button
            key={i}
            className={`hourButton${currentDaySchedule[i] ? ' checked' : ''}`}
            onClick={handleChildEvents}
            onMouseLeave={handleChildEvents}
            onMouseDown={handleChildEvents}
            onMouseUp={handleChildEvents}
          />
        );
      })
  }
  </React.Fragment>
);


HourButtons.propTypes = {
  currentDaySchedule: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func.isRequired,
};


HourButtons.defaultProps = { currentDaySchedule: [0] };


export default HourButtons;
