import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './router';
import reportWebVitals from './reportWebVitals';
import "antd/dist/antd.css";
import 'react-lazy-load-image-component/src/effects/blur.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
