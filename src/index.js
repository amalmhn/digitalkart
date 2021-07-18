import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {FirebaseContext} from './Store/FirebaseContext'
import firebase from './Firebase/config'
import Authentication from './Store/AuthContext';

ReactDOM.render(
  
  <FirebaseContext.Provider value={{firebase}}>
    <Authentication>
    <App />
    </Authentication>
  </FirebaseContext.Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
