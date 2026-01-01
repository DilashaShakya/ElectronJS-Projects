import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import workImage from './assets/work.png';
import breakImage from './assets/break-clicked.png';
import playBtn from './assets/play.png';
import restartBtn from './assets/restart.png';
import closeBtn from './assets/closeBtn.png';
import breakGif from './assets/break.gif';
import tune from './assets/ding.mp3';
function App() {

  const [timeLeft, setTimeLeft] = useState(25*60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [encourangement, setEncouragment] = useState("")
  const endTune = new Audio(tune)

  //countdown timer
  useEffect(()=>{
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft >0){
      timer = setInterval(()=>{
        setTimeLeft(prev=>prev - 1);
      }, 1000)
    }
    return ()=> clearInterval(timer); //if this component remounts, stop the previous interval
  }, [isRunning, timeLeft])

  //formating to (mm:ss)

  const formatTime = (seconds:number): string =>{

    const m = Math.floor(seconds/60).toString().padStart(2,'0')
    const s = (seconds % 60).toString().padStart(2, '0');

    return `${m}:${s}`;

  };

  const handleClick=()=>{
    if (!isRunning){
      setIsRunning(true)
    }
    else{
      setIsRunning(false); //if clicked again, it is stopped 
      setTimeLeft(isBreak ? 5*60 : 25*60);
    }
  }

  const switchMode = (breakMode: boolean)=>{
    setIsBreak(breakMode);
    setIsRunning(false);
    setTimeLeft(breakMode ? 5*60 : 25 * 60)
  }
  
  const cheerMessages = [
    "You'll do great",
    "Keep going!",
    "Stay focused"
  ]

  const breakMessages = [
    "Stay hydrated",
    "Less phone time",
    "Take a walk"
  ]

  //encouragement message updates
  useEffect(()=>{
    let messageInterval: NodeJS.Timeout;

    if (isRunning){
      const messages = isBreak ? breakMessages : cheerMessages;

      setEncouragment(messages[0])
      let index = 1;

      messageInterval = setInterval(()=>{
        setEncouragment(messages[index])
        index = (index + 1) % messages.length;
      },4000); //every 4 seconds

    }else{
      setEncouragment("")
    }
    return ()=> clearInterval(messageInterval); //cleanup (clears old interval )
  },[isRunning, isBreak])

  //sound to ring
  useEffect(()=>{
    if (timeLeft === 0 && isRunning){
      endTune.play().catch(err =>{
        console.log(err);
      });
      setIsRunning(false);
      setTimeLeft(isBreak ? 5*60 : 25*60); // Reset timer after it finishes
    }
  }, [timeLeft, isRunning, isBreak])


  return (
    <div className='home-container' style={{position:'relative'}}>
    <div> 
      <button className='closeButton' onClick={() => window.close()}>
        <img src={closeBtn} alt='Close'/>
      </button>
    </div>
    <div className='home-content'>
      <div className='home-controls'>
        <button className='image-button' onClick={()=>switchMode(false)}>
          <img src = {workImage} alt="work"/>
        </button>
        <button className='image-button' onClick={()=>switchMode(true)}>
          <img src={breakImage} alt='break'/>
        </button>
      </div>
      {isBreak && isRunning && (
        <img src={breakGif} alt="Break animation" className="gif-image" />
      )}
      <p className={`encouragement-text ${!isRunning ? "hidden" : ""}`}> {encourangement}</p>

      <h1 className='home-timer'>{formatTime(timeLeft)}</h1>

      <button className='home-button' onClick={handleClick}> <img src={ isRunning ? restartBtn : playBtn} alt={isRunning ? 'restart' : 'play'}/> </button>
    </div>
    </div>
  );
}

export default App;
