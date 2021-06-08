import React from 'react';
import { minutesToDuration, secondsToDuration} from '../utils/duration';

function CountDown(props) {
    const sessionDisplay = (props.inSession || props.onBreak) ? {display: "block"} : {display: "none"}
    const sessionTitle = (props.onBreak) ? `On Break for ${minutesToDuration(props.breakInterval)} minutes` : `Focusing for ${minutesToDuration(props.focusInterval)} minutes`;
    const pausedLabel = props.isPaused ? <h2>Paused</h2> : null
    const progressPercentage = props.onBreak ? (1-(props.timeRemainingState/(props.breakInterval*60)))*100 : (1-(props.timeRemainingState/(props.focusInterval*60)))*100 ;
    const progressBarStyle = { width: progressPercentage + "%" }

    

    return (
        <div style={sessionDisplay} className="mb-5">
            {/* TODO: This area should show only when a focus or break session is running or pauses */}
            <div className="row mb-2">
                <div className="col">
                    {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
                    <h2 data-testid="session-title">{sessionTitle}</h2>
                    {/* TODO: Update message below to include time remaining in the current session */}
                    <p className="lead" data-testid="session-sub-title">
                    {secondsToDuration(props.timeRemainingState)} remaining
                    </p>
                    {pausedLabel}
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
                        aria-valuenow={progressPercentage} // TODO: Increase aria-valuenow as elapsed time increases
                        style={progressBarStyle} // TODO: Increase width % as elapsed time increases
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountDown;