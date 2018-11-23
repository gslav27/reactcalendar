import React, { memo } from 'react';
import staticData from '../../../utilities/staticData';

const CalendarHeader = () => (
  <div className='header'>
    <div>
      All day
    </div>
    <div/>
    {
      Array(staticData.hours / staticData.hoursGr).fill('').map((_, i) => (
        <span key={i}>
          {`${i * staticData.hoursGr}:00`.padStart(5, 0)}
        </span>
      ))
    }
  </div>
);


export default memo(CalendarHeader);
