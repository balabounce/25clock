/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import './clock.style.scss';
import arrowUp from "../../assets/arrow-up-solid.svg";
import arrowDown from "../../assets/arrow-down-solid.svg";
import playBtn from '../../assets/play-solid.svg';
import pauseBtn from '../../assets/pause-solid.svg';
import reloadBtn from '../../assets/sync-solid.svg';
// import {audio1} from '../../assets/papich.mp3';

const Clock = () => {
    let [power,setPower] = useState(false);
    let [mode, setMode] = useState(true);  //true = session, false = break
    let [sessionTime, setSessionTime] = useState(25);
    let [breakTime, setBreakTime] = useState(5);
    let [timeInBox, setTimeInBox] = useState('25:00');
    let [timerId, setTimerId] = useState(setTimeout(() => { return;}, 5000))
    

    useEffect(() => {
        setTimeInBox(`${sessionTime}:00`);
    }, [sessionTime]);

    useEffect(() => {
        if(power) {
            if(timeInBox === '0:00') {
                const audio = new Audio('papich.mp3');
                audio.play();
                setMode(!mode);
            }
            const timer = timeInBox.split(':');
            let time = new Date();
            time.setMinutes(+timer[0]);
            time.setSeconds(+timer[1]);
            setTimerId(setTimeout(() => {
                time.setSeconds(time.getSeconds() - 1);
                if(time.getSeconds() < 10) {
                    setTimeInBox(`${time.getMinutes()}:0${time.getSeconds()}`);
                } else setTimeInBox(`${time.getMinutes()}:${time.getSeconds()}`);
            }, 1000));
        } else {
            clearTimeout(timerId);
        }
    }, [power, timeInBox]);

    useEffect(() => {
        clearTimeout(timerId);
        if(mode === false) {
            setTimeInBox(`${breakTime}:00`);
        } else {
            setTimeInBox(`${sessionTime}:00`);
        }
    }, [mode]);

    const reload = () => {
        clearTimeout(timerId);
        setPower(false);
        setMode(true);  //true = session, false = break
        setSessionTime(25);
        setBreakTime(5);
        setTimeInBox('25:00');
        setTimerId(setTimeout(() => { return;}, 5000));
    }

    return (
        <section id='clock'>
            <div className="container">
                <div className="title">25 + 5 Clock</div>
                <div className="length">
                    <div className='break'>
                        <p id='break-label'>Break Length</p>
                        <div className="arrows">
                            <button className="arrow-up"  id="break-increment" onClick={() => {
                                if(breakTime < 60) {
                                    setBreakTime(breakTime + 1)
                                }
                            }}>
                                <img src={arrowUp} alt="up" />
                            </button>
                            <p id="break-length">{breakTime}</p>
                            <button className="arrow-down" id="break-decrement" onClick={() => {
                                if(breakTime > 1) {
                                    setBreakTime(breakTime - 1)
                                }
                            }}>
                                <img src={arrowDown} alt="down" />
                            </button>
                        </div>
                    </div>
                    <div className='session'>
                        <p id="session-label">Session Length</p>
                        <div className="arrows">
                            <button className="arrow-up" id="session-increment" onClick={() => {
                                if(sessionTime < 60) {
                                    setSessionTime(sessionTime + 1)                                }
                            }}>
                                <img src={arrowUp} alt="up" />
                            </button>
                            <p id="session-length">{sessionTime}</p>
                            <button className="arrow-down" id="session-decrement" onClick={() => {
                                if(sessionTime > 1) {
                                    setSessionTime(sessionTime - 1)                                
                                }
                            }}>
                                <img src={arrowDown} alt="down" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="timer-box">
                    <p className="timer-box-title" id="timer-label">{mode ? 'Session' : 'Break'}</p>
                    <p className="timer" id="time-left" >{timeInBox}</p>
                </div>
                <div className="timer-functions">
                    <div id="start_stop">
                        <button onClick={() => {
                            setPower(!power);
                        }}>
                            <img src={playBtn} alt="play" />
                            <img src={pauseBtn} alt="pause" />
                        </button>
                    </div>
                    <button id="reset" onClick={() => reload()}>
                        <img src={reloadBtn} alt="reload" />
                    </button>
                </div>
            </div>
            <audio id="beep" src="../../assets/papich.mp3"></audio>
        </section>
    )
}

export default Clock;