import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import App from './App';

ReactDOM.render(<Suspense fallback={<div className="load-center"><div className="loader"></div></div>}>
  <BrowserRouter>
    <App />
  </BrowserRouter></Suspense>,
  document.getElementById('root')
);


