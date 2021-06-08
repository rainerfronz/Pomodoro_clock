import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import React from 'react';

const FocusDuration = ({
  focusDurationLength,
  decreaseFocusDurationByOneMinute,
 increaseFocusDurationByOneMinute,
}) => {
//   const focusDurationInMinutes = moment.duration(sessionLength, 's').minutes();
  return (
    <div>
      <p id="focusDuration-label">Session</p>
      <p id="focusDuration-length">{focusDurationInMinutes}</p>
      <button id="focusDuration-decrease" onClick={decreaseFocusDurationByOneMinute}>
        -
      </button>
      <button id="focusDuration-increment" onClick={increaseFocusDurationByOneMinute}>
        +
      </button>
    </div>
  );
};

export default FocusDuration;