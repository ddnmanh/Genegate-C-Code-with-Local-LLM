import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom'; 

import { GlobalStyles } from './components/index.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <GlobalStyles>
      <App />
    </GlobalStyles>
  </Router>
)
