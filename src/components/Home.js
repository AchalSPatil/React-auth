import React, { useState, useEffect } from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
    const [workTime, setWorkTime] = useState(25 * 60); // 25 minutes in seconds
    const [breakTime, setBreakTime] = useState(5 * 60); // 5 minutes in seconds
    const [timerActive, setTimerActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    // //////////////////////
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    let timerInterval;

    if (timerActive && workTime > 0) {
      timerInterval = setInterval(() => {
        setWorkTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timerActive && workTime === 0 && !isBreak) {
      // Work timer has completed, switch to break timer
      clearInterval(timerInterval);
      setTimerActive(false);
      setIsBreak(true);
      setTimeout(() => {
        setTimerActive(true);
        setIsBreak(false);
        setWorkTime(25 * 60); // Reset work timer for the next cycle
      }, breakTime * 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timerActive, workTime, isBreak, breakTime]);

  const startTimer = () => {
    setTimerActive(true);
  };

  const pauseTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setTimerActive(false);
    setIsBreak(false);
    setWorkTime(25 * 60);
    setBreakTime(5 * 60); // Reset break timer as well
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome <br />
        {user && user.email}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>

      <div className="homepage p-4 box mt-3 text-center">
      <h1>{isBreak ? 'Break Timer' : 'Work Timer'}: {formatTime(workTime)}</h1>
      {timerActive ? (
        <button className='btn' onClick={pauseTimer}>Pause</button>
      ) : (
        <button className='btn' onClick={startTimer}>Start</button>
      )}
      <button className='btn' onClick={resetTimer}>Reset</button>

      <h2>Next Timer: {isBreak ? 'Work' : 'Break'}</h2>
      </div>
    </>
  );
};

export default Home;