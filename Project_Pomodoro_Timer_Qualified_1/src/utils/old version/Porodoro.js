import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const[time, setTime] = useState(25);
  const[breakTime, setBreakTime] = useState(5);
  const [initialFocus, setInitialFocus] = useState(25);
  const [initialBrek, setInitialBreak] = useState(5);
  const [progressPercent, setProgressPercent] = useState(100);
  const [progressVal, setProgressVal] = useState(0);
  const [paused, setPaused] = useState(false);

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
  handleBreakIncrease = () => {
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


  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause(event) {
if(isTimeRunning) {
    setIsTimerRunning(!isTimeRunning) 
    setPaused(true)
 } else {
     setIsTiemRunning(!isTimeRunning)
     setPaused(false)
 }
}
const handleStop = (event) => {
    setIsTimerRunning(false) 
    setTime(initialFocus)
    setBreakTime(initialBreak)
    setProgressPercent(100)

    setPaused(false)
}


  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              <FocusDuration initialFocus={initialFocus}/>
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                onClick = {handleFocusDecrease}
                className="btn btn-secondary"
                data-testid="decrease-focus"
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                onClick = {handleFocusIncrease}
                className="btn btn-secondary"
                data-testid="increase-focus"
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                <BreakDuration initialBreak={initialBreak} />
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  onClick = {handleBreakDecrease}
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  onClick = {handleBreakIncrease}
                  className="btn btn-secondary"
                  data-testid="increase-break"
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              onClick = {handleStop}
              className="btn btn-secondary"
              title="Stop the session"
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">
                <SetMessage time={time} breakTime={breakTime} initialBreak={initialBreak} initialFocus={initialFocus} paused ={paused}/>
            </h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              <RemainingMessage time={time} breakTime={breakTime} />
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progressVal} // TODO: Increase aria-valuenow as elapsed time increases
                style={ {width: `${progressPercent}%`} } // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
