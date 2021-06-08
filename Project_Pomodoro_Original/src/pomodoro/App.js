import "./App.css";
import Pomodoro from "./pomodoro/Pomodoro";


function App() {
    const audioElement = useRef(null)
    const handleResetButtonClick = () => {
        // reset audio
        audioElement.current.load();
        // clear the timeout interval
        clearInterval(intervalId);
        // set the intervalId null
        setIntervalId(null);
        // set the sessiontype to 'Session'
        setCurrentSessionType('Session');
        // reset the session length to 25 minutes
        setSessionLength(60 * 25);
        // reset the break length to 5 minutes
        setBreakLength(60 * 5);
        // reset the timer to 25 minutes (initial session length)
        setTimeLeft(60 * 25);
      };
  return (
    <div className="App">
      <header className="App-header container">
        <h1>Pomodoro Timer</h1>
      </header>
      <div className="container">
        <Pomodoro />
        <FocusDuration 
        focusLength={focusDuration}
        decrementFocusDurationByOneMinute={decreaseFocusDurationByOneMinute}
        increaseFocusDurationByOneMinute={incrementSessionLengthByOneMinute}
      />
,
        <BreakDuration 
        breakDuration={breakDuration}
        decreaseBreakDurationByOneMinute={decreaseBreakDurationByOneMinute}
        increaseBreakDurationByOneMinute={increaseBreakDurationByOneMinute}
      />
      <button id="reset" onClick={handleResetButtonClick}>
        Reset
      </button>

      <audio id="beep" ref={audioElement}>
        <source src="https://bigsoundbank.com/UPLOAD/mp3/1482.mp3" type="audio/mpeg" />
      </audio>
      
        
        
      </div>
    </div>
  );
}


export default App;

