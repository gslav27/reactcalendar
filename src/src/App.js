import React, { Component } from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import store from './store/store';
import Calendar from './containers/Calendar';
import BottomButtons from './containers/BottomButtons';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <h3>Set schedule</h3>
          <Calendar />
          <BottomButtons />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
