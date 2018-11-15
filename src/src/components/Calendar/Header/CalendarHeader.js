import React, { PureComponent } from 'react';
import staticData from '../../../utilities/staticData';


class CalendarHeader extends PureComponent {
  render() {
    const { hours, hoursGr } = staticData;
    return (
      <div className='header'>
        <div />
        <div>All day</div>
        {
          Array(hours / hoursGr).fill('').map((_, i) => (
            <span key={i}>
              {`${i * hoursGr}:00`.padStart(5, 0)}
            </span>
          ))
        }
      </div>
    );
  }
}


export default CalendarHeader;
