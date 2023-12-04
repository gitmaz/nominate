import logo from './logo.svg';
import './App.css';
import Applicants from "./components/Applicants";
import React from "react";

function App() {
  return (
    <div className="App" >
      <div className="App-header-div">
          <img src={logo} className="App-logo" alt="logo"  /><h2>Nominate Applicants</h2>
      </div>
      <Applicants className="Applicants-container" />
    </div>
  );
}

export default App;
