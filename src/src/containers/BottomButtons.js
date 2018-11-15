import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  clearSchedule,
  saveSchedule,
} from '../operations/scheduleOperations';
import NamedButton from '../components/Buttons/NamedButton/NamedButton';


const BottomButtons = props => (
  <section>
    <NamedButton
      label='Clear'
      onClick={props.clearSchedule}
    />
    <NamedButton
      label='Save changes'
      type='submit'
      form='calendar'
      onClick={props.saveSchedule}
    />
  </section>
);

BottomButtons.propTypes = {
  clearSchedule: PropTypes.func.isRequired,
  saveSchedule: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  clearSchedule,
  saveSchedule,
};

export default connect(null, mapDispatchToProps)(BottomButtons);
