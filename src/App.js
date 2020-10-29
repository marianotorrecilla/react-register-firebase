import React from 'react';
import List from './components/List';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css'

function App() {
  return (
    <div className="container-fluid">
      
      <div>
        <List />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
