import React from "react";

function ProgressBar ({ session }) {

  return (
    <div className="progress" style={{ height: "20px" }}>
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={ (session.currentDuration - session.timer) / session.currentDuration * 100 }// Increase aria-valuenow as elapsed time increases
        style={{ width:`${(session.currentDuration - session.timer) / session.currentDuration * 100}%` }} // Increase width % as elapsed time increases
      />
  </div>
  );
}

export default ProgressBar;