import { useState, useEffect } from 'react';

import './App.css';

const Timer = () => {
  const [mode, setMode] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);




  function switchMode() {
    setMode(!mode);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  }

  function toggle() {
    setIsRunning(!isRunning);
  }

  function toggleTimer() {
    if(seconds > 60 || minutes > 60){
     alert("Write correct value!") 
    } else
    setIsTimerRunning(!isTimerRunning);
  }

  function reset() {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setIsRunning(false);
  }

  ///stoper
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds +  1);
        if (seconds ===  59) {
          setMinutes(minutes => minutes +  1);
          setSeconds(0);
        }
        if (minutes ===  59) {
          setHours(hours => hours +  1);
          setMinutes(0);
        }
      },  1000);
    } else if (!isRunning && seconds !==  0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);


  //timer
  useEffect(() =>{
    
    let interval = null;
    if (isTimerRunning){
      interval = setInterval(() => {
        setSeconds(seconds => seconds -  1);
        if (seconds ===  0) {
          setMinutes(minutes => minutes - 1);
          setSeconds(59);
        }
        if (seconds === 0 && minutes === 0){
          clearInterval(interval);
          setSeconds(0)
          setMinutes(0)
        }
      },  1000);
    } else if (!isTimerRunning && seconds !==  0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, seconds]);

  

  return (
    <div className="app">
      <div className='app-Select'>
        <h1>Change mode</h1>
        <div className="row">
          <button className="button" onClick={switchMode}>
            {mode ? 'Stoper' : 'Timer'}
          </button>
        </div>
      </div>

      {mode ? (
      <div className='timer'>
          <div className='app-timer'>
          <div className="time">
            {minutes}m: {seconds}s
          </div>
          <div className="row">
            <button className="button" onClick={toggleTimer}>
              {isTimerRunning ? 'Pause' : 'Start'}
            </button>
            <button className="button" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
        <div className='Inputs'>
          <h1>Add time!</h1>
          <input placeholder='Add seconds' type='number' className='secInput' max={60} onChange={e => setSeconds(e.target.value)}></input>
          <input placeholder='Add Minutes' type='number' className='minInput' max={60} onChange={e => setMinutes(e.target.value)}></input>
        </div>
      </div>
      
      
      ) : (
        <div className='app-timer'>
          <div className="time">
            {hours}h: {minutes}m: {seconds}s
          </div>
          <div className="row">
            <button className="button" onClick={toggle}>
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button className="button" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
