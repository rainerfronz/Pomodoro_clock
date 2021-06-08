import moment from 'moment';
import React from 'react';
import momentDurationFormatSetup from 'moment-duration-format';

const Break = ({
  breakDuration,
  decreaseBreakDurationByOneMinute,
  increaseBreakDurationByOneMinute,
}) => {
 const breakDurationInMinutes = moment.duration(breakLength, 's').minutes();
  return (
    <div>
      <p id="break-label">Break</p>
      <p id="break-length">{breakDurationInMinutes}</p>
      <button id="break-decrement" onClick={ddecreaaseBreakDurationhByOneMinute}>
        -
      </button>
      <button id="break-increment" onClick={increaseBreakDurationByOneMinute}>
        +
      </button>
    </div>
  );
};

export default Break;