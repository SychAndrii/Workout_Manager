import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useEffect, useRef, useState } from "react";
import UpdateDurationDone from "../../actions/update/UpdateDurationDone";
import { Button } from "@/components/ui/button";

const RestComponent = ({ component, updateDone }) => {
  const duration = component.duration;
  const [clockKey, setClockKey] = useState(0);
  const [play, setPlay] = useState(false);
  const [initialTime, setInitialTime] = useState(
    component.duration - component.currentDuration
  );

  const onSecondPassed = () => {
    if (play)
      updateDone(
        new UpdateDurationDone(
          component,
          component.durationDone + 1,
          component.currentDuration + 1
        )
      );
  };

  const onRestartTimer = () => {
    setClockKey((prev) => prev + 1);
    setInitialTime(component.duration);
    updateDone(new UpdateDurationDone(component, component.durationDone, -1));
    setPlay(true);
  };

  const onToggleTimer = () => {
    setPlay(!play);
  };

  useEffect(() => {
    setPlay(component.durationDone === 0);
  }, []);

  return (
    <div className="relative flex justify-center flex-col items-center gap-4">
      <svg style={{ height: 0, width: 0 }}>
        <defs>
          <linearGradient id="text-gradient" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#42A2AF" />
            <stop offset="25%" stopColor="#1986D9" />
            <stop offset="50%" stopColor="#4EAAA3" />
            <stop offset="75%" stopColor="#7EC862" />
            <stop offset="100%" stopColor="#54AD9D" />
          </linearGradient>
        </defs>
      </svg>
      <CountdownCircleTimer
        key={clockKey}
        duration={duration}
        initialRemainingTime={initialTime}
        size={480}
        isPlaying={play}
        colors="url(#text-gradient)"
        onUpdate={onSecondPassed}
      >
        {renderTime}
      </CountdownCircleTimer>
      <div className=" flex gap-4">
        <Button
          disabled={component.duration === component.currentDuration}
          onClick={onToggleTimer}
        >
          {play || component.duration === component.currentDuration
            ? "Stop timer"
            : "Resume timer"}
        </Button>
        <Button onClick={onRestartTimer}>Restart timer</Button>
      </div>
    </div>
  );
};

const renderTime = ({ remainingTime }) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className=" flex flex-col justify-center items-center gap-4 text-4xl font-bold">
      <div
        style={{
          background:
            "linear-gradient(to right, #42A2AF 0%, #1986D9 25%, #4EAAA3 50%, #7EC862 75%, #54AD9D 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#7CC764" }}>Take your time to rest!</h2>
        {`${minutes}m : ${seconds}s`}
      </div>
    </div>
  );
};

export default RestComponent;