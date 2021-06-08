import React from "react";
import ProgressBar from "./ProgressBar";
import { secondsToDuration } from "../utils/duration";

function Countdown ({ session, isTimerRunning }) {

  if (!session.active) return null;


  return (  
    <div>
      {/* This area should show only when a focus or break session is running or pauses */}
      <div className="row mb-2">
        <div className="col">
          {/* Update message below to include current session (Focusing or On Break) and total duration */}
          <h2 data-testid="session-title">{session.sessionTypeVerb} for {secondsToDuration(session.currentDuration)} minutes</h2>          
          {/* Update message below to include time remaining in the current session */}
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(session.timer)} remaining
          </p>
          <h3>{!isTimerRunning && `PAUSED`}</h3>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <ProgressBar session={ session } />
        </div>
      </div>
    </div>
  )
}

export default Countdown;