import React from "react";
import { secondsToDuration } from "../utils/duration";
import classNames from "../utils/class-names";

function BreakDuration ({ min, max, label, session, setSession }) {
  const decreaseButtonHandler = () => {
    if (session.breakDuration > min) (setSession({ ...session, breakDuration: session.breakDuration - 60 }));
  }
  
  const increaseButtonHandler = () => {
    if (session.breakDuration < max) (setSession({ ...session, breakDuration: session.breakDuration + 60 }));
  };
  
  return (
    <div className="input-group input-group-lg mb-2">
      <span className="input-group-text" data-testid="duration-break">
        {/* display the current break session duration */}
        {`${label} ${secondsToDuration(session.breakDuration)}`}
      </span>
      <div className="input-group-append">
        {/* decreasing break duration and disable during a focus or break session */}
        <button
          type="button"
          className={classNames({
            "btn": true,
            "btn-primary": !session.active,
            "btn-secondary": session.active,
          })}
          onClick={ !session.active ? decreaseButtonHandler : undefined }
          data-testid="decrease-break"
        >
          <span className="oi oi-minus" />
        </button>
        {/* increasing break duration and disable during a focus or break session */}
        <button
          type="button"
          className={classNames({
            "btn": true,
            "btn-primary": !session.active,
            "btn-secondary": session.active,
          })}
          onClick={ !session.active ? increaseButtonHandler : undefined }
          data-testid="increase-break"
        >
          <span className="oi oi-plus" />
        </button>
      </div>
    </div>
  );
}

export default BreakDuration;