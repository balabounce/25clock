import React, { useState } from "react";
import './clock.style.scss';
import arrowUp from "../../assets/arrow-up-solid.svg";
import arrowDown from "../../assets/arrow-down-solid.svg";
import playBtn from '../../assets/play-solid.svg';
import pauseBtn from '../../assets/pause-solid.svg';
import reloadBtn from '../../assets/sync-solid.svg';

const Clock = () => {
    let [mode, setMode] = useState('Session');
    let [sessionTime, setSessionTime] = useState(25);
    let [breakTime, setBreakTime] = useState(5);
    let [timeInBox, setTimeInBox] = useState('25:00');
    let [timerId, setTimerId] = useState(
        setInterval(() => 
            { return;
        }, 5000))


    const updateTimeInBox = () => {
        if(mode === 'Session') {
            setTimeInBox(`${sessionTime}:00`);
        }
        if(mode === 'Break') {
            setTimeInBox(`${breakTime}:00`);
        }
    }

    const changeTime = (oper: string, box: string) => {
        if(box === 'session') {
            if(oper === 'minus') {
                setSessionTime(--sessionTime);
            }
            if(oper === 'plus') {
                setSessionTime(++sessionTime);
            }
        }
        if(box === 'break') {
            if(oper === 'minus') {
                setBreakTime(--breakTime);
            }
            if(oper === 'plus') {
                setBreakTime(++breakTime);
            }
        }
        updateTimeInBox();        
    }

    const changeMode = () => {
        console.log(mode);
        if(mode === 'Session') {
            setMode('Break');
        } else {
            setMode('Session');
        }
        updateTimeInBox();
    }

    const timerActivating = () => {
        let time = timeInBox.split(':');
        let minutes = +time[0];
        let seconds = +time[1];
        let timer = new Date();
        timer.setMinutes(minutes, seconds);
        setTimerId(
            setInterval(() => {
                timer.setSeconds(timer.getSeconds() - 1);
                console.log(timerId);
                if(timer.getSeconds() === 58 && timer.getMinutes() === 0) {
                    clearInterval(timerId);
                    changeMode();
                    timerActivating();
                }
                if(timer.getSeconds() < 10) {
                    setTimeInBox(`${timer.getMinutes()}:0${timer.getSeconds()}`);
                } else {
                    setTimeInBox(`${timer.getMinutes()}:${timer.getSeconds()}`);
                }
            }, 1000)
        );
    }

    const pause = () => {
        clearInterval(timerId);
    }

    const reload = () => {
        clearInterval(timerId);
        setSessionTime(25);
        setBreakTime(5);
        setTimeInBox('25:00');
    }

    return (
        <section id='clock'>
            <div className="container">
                <div className="title">25 + 5 Clock</div>
                <div className="length">
                    <div className='break'>
                        <p>Break Length</p>
                        <div className="arrows">
                            <button className="arrow-up" onClick={() => {
                                if(breakTime < 60) {
                                    changeTime('plus', 'break');
                                }
                            }}>
                                <img src={arrowUp} alt="up" />
                            </button>
                            <p>{breakTime}</p>
                            <button className="arrow-down" onClick={() => {
                                if(breakTime > 1) {
                                    changeTime('minus', 'break');
                                }
                            }}>
                                <img src={arrowDown} alt="down" />
                            </button>
                        </div>
                    </div>
                    <div className='session'>
                        <p>Session Length</p>
                        <div className="arrows">
                            <button className="arrow-up" onClick={() => {
                                if(sessionTime < 60) {
                                    changeTime('plus', 'session')
                                }
                            }}>
                                <img src={arrowUp} alt="up" />
                            </button>
                            <p>{sessionTime}</p>
                            <button className="arrow-down" onClick={() => {
                                if(sessionTime > 1) {
                                    changeTime('minus', 'session')
                                }
                            }}>
                                <img src={arrowDown} alt="down" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="timer-box">
                    <p className="timer-box-title">{mode}</p>
                    <p className="timer">{timeInBox}</p>
                </div>
                <div className="timer-functions">
                    <button onClick={() => timerActivating()}>
                        <img src={playBtn} alt="play" />
                    </button>
                    <button onClick={() => pause()}>
                        <img src={pauseBtn} alt="pause" />
                    </button>
                    <button onClick={() => reload()}>
                        <img src={reloadBtn} alt="reload" />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Clock;