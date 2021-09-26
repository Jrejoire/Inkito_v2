import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from './stores/appStore';
import { HelmetProvider } from 'react-helmet-async';
import './index.scss';
import App from './containers/app';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
          <App />
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
