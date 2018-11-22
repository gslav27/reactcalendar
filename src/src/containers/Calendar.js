import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchSchedule,
  updateWholeDaySchedule,
  updateDaysHour,
} from '../operations/scheduleOperations';

import CalendarLayout from '../components/Calendar/CalendarLayout';


class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseDownOnHourButton: false,
      valueBeforeMouseDown: null,
    };
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleHourButtonEvent = this.handleHourButtonEvent.bind(this);
    this.eventHandlers = {
      click: this.handleMouseClick,
      mouseleave: this.handleMouseLeave,
      mousedown: this.handleMouseDown,
      mouseup: this.handleMouseUp,
    };
  }

  componentDidMount() {
    this.props.fetchSchedule();
  }

  handleMouseDown(day, hour) {
    !this.state.mouseDownOnHourButton &&
    this.setState({
      mouseDownOnHourButton: true,
      valueBeforeMouseDown: this.props.currentSchedule[day][hour],
    });
  }

  handleMouseUp() {
    this.state.mouseDownOnHourButton && this.setState({ mouseDownOnHourButton: false });
  }

  handleMouseLeave(day, hour) {
    const { currentSchedule, updateDaysHour } = this.props;
    this.state.mouseDownOnHourButton &&
    (
      this.state.valueBeforeMouseDown
        ? currentSchedule[day][hour] && updateDaysHour(day, hour)
        : !currentSchedule[day][hour] && updateDaysHour(day, hour)
    );
  }

  handleMouseClick(day, hour) {
    this.props.updateDaysHour(day, hour);
  }

  handleHourButtonEvent(e, ...restParams) {
    e.preventDefault();
    this.eventHandlers[e.type](...restParams);
  }

  render() {
    return (
      <CalendarLayout
        currentSchedule={this.props.currentSchedule}
        onDayButtonClick={this.props.updateWholeDaySchedule}
        onHourButtonEvent={this.handleHourButtonEvent}
      />
    );
  }
}

Calendar.propTypes = {
  currentSchedule: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  fetchSchedule: PropTypes.func.isRequired,
  updateWholeDaySchedule: PropTypes.func.isRequired,
  updateDaysHour: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ currentSchedule: state.schedule });

const mapDispatchToProps = {
  fetchSchedule,
  updateWholeDaySchedule,
  updateDaysHour,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
