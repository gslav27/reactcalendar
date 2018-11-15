import React from 'react';

const Button = ({ type = 'button', children, className, ...handlers }) => (
  <button
    className={className}
    type={type}
    {...handlers}
  >
    {children}
  </button>
);

export default Button;
