import React from 'react';
import Button from '../ButtonTemplate';
import NamedButtonStyle from './NamedButton.style.scss';

const NamedButton = ({ label, ...restProps }) => (
  <Button
    className='namedButton'
    {...restProps}
  >
    {label}
  </Button>
);

export default NamedButton;
