import React from 'react';
import ReactDOM from 'react-dom';
import Loginx from './Loginx.js';

ReactDOM.render(<Loginx />, document.querySelector('#root'));

if (module.hot) {
  module.hot.accept();
}
