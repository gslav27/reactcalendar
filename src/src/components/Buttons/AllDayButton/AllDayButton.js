import React from 'react';
import Button from '../ButtonTemplate';
import AllDayButtonStyle from './AllDayButton.style.scss';


const AllDayButton = ({ isChecked, ...restProps }) => (
  <Button
    className={`allDayButton ${isChecked && 'isChecked'}`}
    {...restProps}
  />

);

export default AllDayButton;
