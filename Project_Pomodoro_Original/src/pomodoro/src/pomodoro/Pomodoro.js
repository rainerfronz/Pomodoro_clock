import React, { useState } from "react";

import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import ChangeSession from "./ChangeSession";

import FocusDuration from "./FocusDuration";
import BreakDuration from "./BreakDuration";
import Countdown from "./CountDown";


function Pomodoro() {
  //Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const initialSession = {
    active: false,              
    focusSession: true,         
    sessionType: "Focusing",
    focusDuration: 1500,        
    breakDuration: 300,         
    currentDuration: 0,         
    timer: 1500,                
  }

  const [session, setSession] = useState({...initialSession});

    useInterval(() => {
      setSession({...session, timer: session.timer - 1});
      if(session.timer < 1) (ChangeSession(session,setSession))
    },
    isTimerRunning ? 1000 : null
    );
    function playPause() {
      setIsTimerRunning((prevState) => !prevState);
      if(!initialSession.active) {
      setSession({
        ...session,
        active: true,
        currentDuration: session.focusDuration,
        timer: session.focusDuration,
      });
    }
}
const stopHandler = () => {
  setIsTimerRunning(false);
  setSession({
    ...session, 
    active: false,
    focusSession: true,

  })
}

return (
  <div className="pomodoro">
    <div className="row">
      <div className="col">
        <FocusDuration
          min={ 300 }
          max={ 3600 }
          label={ "Focus Duration: " }
          session={ session }
          setSession={ setSession }
        />
      </div>
      <div className="col">
        <div className="float-right">
          <BreakDuration
            min={ 60 }
            max={ 900 }
            label={ "Break Duration: " }
            session={ session }
            setSession={ setSession }
          />
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
          {/* button: stop the current focus or break session and disable when there is no active session */}
          <button
            type="button"
            className={classNames({
              "btn": true,
              "btn-primary": session.active,
              "btn-secondary": !session.active,
            })}
            title="Stop the session"
            onClick={ session.active ? stopHandler : undefined }
          >
            <span className="oi oi-media-stop" />
          </button>
        </div>
      </div>
    </div>
    <Countdown
      session={ session }
      isTimerRunning={ isTimerRunning }
    />
  </div>
);
}

export default Pomodoro;
