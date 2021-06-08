export default function ChangeSession(session, setSession) {
  
    if (session.focusSession) {
      // do this when changing from focus to break
      setSession({
        ...session,
        focusSession: false,
        sessionTypeVerb: "On Break",
        currentDuration: session.breakDuration,
        timer: session.breakDuration,
      });
    } else {
      // do this when changing from break to focus
      setSession({
        ...session,
        focusSession: true,
        sessionTypeVerb: "Focusing",
        currentDuration: session.focusDuration,
        timer: session.focusDuration,
      });
    }
    new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1922.mp3`).play();
  }