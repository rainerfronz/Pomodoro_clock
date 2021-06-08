import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import FocusDuration from "./FocusDuration"
import BreakDuration from "./BreakDuration";
import classNames from "../utils/class-names";
import TimeDisplay from "./TimeDisplay";
import PlayPauseStop from "./PlayPauseStop";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */


/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param time
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
// function nextSession(time, breakDuration) {
//   /**
//    * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
//    */
//   return (currentSession)

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const[time, setTime] = useState(25); 
  const[breakTime, setBreakTime] = useState(5); 
  const [initialFocus, setInitialFocus] = useState(25); 
  const [initialBreak, setInitialBreak] = useState(5);
  
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [activeSession, setActiveSession] = useState(false); //active session
  const [modeFocus, setMode] = useState(true);
  const [timerMinutes,setTimerMinutes] = useState(25);

const minFocus = 5;
const minBreak = 1;
const maxFocus = 60;
const maxBreak = 15;
  // ToDo: Allow the user to adjust the focus and break duration.
  const handleFocusDecrease = () => {
      if(time -5 >minFocus) {
          setTime(time - 5)
          setInitialFocus(initialFocus - 5)
      } else {
          setTime(5)
          setInitialFocus(5)
      }
  }
  const handleFocusIncrease = () => {
      if(time + 5 < maxFocus) {
          setTime(time + 5)
          setInitialFocus(initialFocus + 5)
      }else {
          setTime(60)
          setInitialFocus(60)
      }
  }
  const handleBreakDecrease = () => {
      if(breakTime - 1 > minBreak) {
          setBreakTime(breakTime - 1)
          setInitialBreak(initialBreak -1)
        }else {
            setBreakTime(1)
            setInitialBreak(1)
        }
  }
  const handleBreakIncrease = () => {
      if(breakTime + 1 < maxBreak) {
          setBreakTime(breakTime + 1)
          setInitialBreak(initialBreak + 1)
      }else {
          setBreakTime(15)
          setInitialBreak(15)
      }
  }

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
   useInterval(
    () => {
      //what should happen when the timer is running
      setTimerSeconds(second => {
        second === 0 ? second = 59 : second -= 1;
        if (second === 59)
          setTimerMinutes(minutes => minutes = timerMinutes - 1);
        return second;
      });

      if(timerMinutes === 0 && timerSeconds === 1)
      timeExpired();
    },
    isTimerRunning ? 1000 : null
  );

  function timeExpired(){
    if (modeFocus){
      new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play()
      setMode(false);
      setTimerMinutes(breakTime);
    }

    if (!modeFocus){
      new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
      setMode(true);
      setTimerMinutes(time);
    }
  }

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
    if(activeSession === false){
      startSession()
    };
  }

  function startSession(){
    setTimerMinutes(time);
    setTimerSeconds(0);
    setActiveSession(true);
  }

  function stopSession(){
    if(activeSession === true){
    setIsTimerRunning(false);
    setActiveSession(false);
    setTimerMinutes(time);
    setTimerSeconds(0);
    setMode(true);
    }
  }
  


  return (
<div className="pomodoro">
      <div className="row">
        <FocusDuration time={time} decreaseFocusDuration={handleFocusDecrease} increaseFocusDuration={handleFocusIncrease}/>
        <BreakDuration breakDuration={breakTime} decreaseBreakDuration={handleBreakDecrease} increaseBreakDuration={handleBreakIncrease}/>
      </div>
      <div className="row">
        <div className="col">
        <PlayPauseStop playPause={playPause} isTimerRunning={isTimerRunning} stopSession={stopSession} classNames={classNames}/>
        </div>
      </div>
       <TimeDisplay 
      activeSession={activeSession}  
      modeFocus={modeFocus} 
      timerMinutes={timerMinutes} 
      timerSeconds={timerSeconds} 
      time={time} 
      breakTime={breakTime}/>
    </div>
  );
}

export default Pomodoro;









   