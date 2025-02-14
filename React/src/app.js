import React from 'react'
import { useState, useEffect, useRef } from 'react'

/*
TODO: Style the rest of the app with the candle, try to find out how to have React target CSS styling primarly want to move the background's gradient with the timer ticking down

*/
export default function Timer() {
    const [event, setEvent] = useState('Session')
    const [time, setTime] = useState(25)
    const [sessionTime, setSessionTime] = useState(25)
    const [breakTime, setBreakTime] = useState(5)
    const [ticking, setTicking] = useState(false)
    const intervalRef = useRef(null)
    let audio = new Audio("https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav")

    // sets the inital time of 25:00
    useEffect(() => {
        let eventTime = event == 'Session' ? sessionTime : breakTime
        setTime(eventTime * 60 * 1000)
    }, [breakTime, sessionTime, event])

    // ticking functionality of the timer

    // Relying on the ticking as dependency is causing bugs maybe instead have an interval that consistently ticks outside and when a user clicks the start timer it would sync up the timers?? 
    // need to add corrections of tracking the time left to modify the end time 


    useEffect(() => {
        console.log(time)
        // if ticking is false then nothing happens
        if (!ticking) return

        let endTime = Date.now() + time

        intervalRef.current = setInterval(() => {
            let remainingTime = endTime - new Date()
            if (remainingTime > 1000) {
                setTime(remainingTime)
                console.log(remainingTime)
            } else {
                clearInterval(intervalRef.current)
                setTime(0)
                console.log(time)
                // audio.play()
                // right now nothing causes the interval to switch but it does seem like the timer stops
                setTimeout(() => {
                    setEvent(preEvent => preEvent == 'Session' ? 'Break' : 'Session')
                    console.log('setting')
                }, 1000)

            }
        }, 500)

        return () => clearInterval(intervalRef.current)

    }, [ticking, event])

    function reset() {
            clearInterval(intervalRef.current)
        setTicking(false)
        setSessionTime(25)
        setEvent('Session')
        setBreakTime(5)
        setTime(25 * 60 * 1000)
        audio.pause()
        audio.currentTime = 0
    }

    function timeManagement(type, action) {
        if (!ticking) {
            let [state, stateChanger] = type == 'break' ? [breakTime, setBreakTime] : [sessionTime, setSessionTime]
            if ((action === 'up' && state < 60) || (action === 'down' && state > 1)) {
                if (action == 'up') {
                    stateChanger(state + 1)
                } else if (action == 'down') {
                    stateChanger(state - 1)
                }
            }
        }
    }
    return (
        <>
            <div id='heading'>Fangtasy Candle Timer</div>
            <div id='timer-container' >
                <TimerControls type={'break'} sessionTime={sessionTime} breakTime={breakTime} timeManagement={timeManagement} />
                <TimerControls type={'session'} sessionTime={sessionTime} breakTime={breakTime} timeManagement={timeManagement} />
            </div>
            <Display status={event} time={time} />
            <div id="console">
                <div id="start_stop" onClick={() => setTicking(!ticking)}><i className="fa-solid fa-fire"></i></div>
                <div id="reset" onClick={() => reset()}><i className="fa-solid fa-arrows-rotate"></i></div>
            </div>

        </>
    )
}


function TimerControls({ type, sessionTime, breakTime, timeManagement }) {
    return (
        <div className='timer' id={type + "-Timer"}>
            <div id={type + '-label'}>{type[0].toUpperCase() + type.slice(1,) + " Length"}</div>
            <div className='timer-controls' >
                <div><i onClick={() => timeManagement(type, 'down')} id={type + '-decrement'} className="fa-solid fa-chevron-down"></i></div>
                <div id={type + '-length'}>{type == 'session' ? sessionTime : type == 'break' ? breakTime : null}</div>
                <div onClick={() => timeManagement(type, 'up')}><i id={type + '-increment'} className="fa-solid fa-chevron-up"></i></div>
            </div>
        </div>
    )
}
function Display({ status, time }) {
    let min = Math.floor(time / 1000 / 60)
    let sec = Math.floor(time / 1000 % 60)

    return (
        <div id='display-container'>
            <div id='timer-label'>{status}</div>
            <div id='time-left'>{`${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`}</div>
        </div>
    )
}
