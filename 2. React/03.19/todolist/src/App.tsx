import React from 'react';
import logo from './logo.svg';
import Todolist from './Todolist';
// import MapTest from './MapTest';
import Clock from './Timer';
import './App.css';

function App() {
  let name = "리액트";

  // const style = {
  //   backgroundColor : 'black',
  //   color : 'white',
  //   fontsize : '48px',
  //   fontweight : 'bold',
  //   padding : '20px'
  // }

  return (
    <div className="container">
      <Todolist></Todolist>
      {/* <MapTest></MapTest> */}
      <Clock></Clock>
      <h1 className = 'test'> Hello, React!!, {
        name === '리액트' ? (<h1>YES</h1>): null
        }!!</h1>
      <p>반갑습니다.</p>
         
    </div>
  );
}


export default App;
