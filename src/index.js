import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import clevertap from './libs/ctsdk'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

let Clevertap = clevertap
Clevertap.privacy.push({ optOut: false });
// Clevertap.init('W9R-486-4W5Z');
Clevertap.init('4R4-5K9-475Z', 'sk1-staging-4', 'wzrkt.com')
Clevertap.setLogLevel(3);
window.clevertap = Clevertap
// console.log(process)
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App className=" bg-gray-100" />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
