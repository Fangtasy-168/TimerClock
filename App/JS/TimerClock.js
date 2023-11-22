// Vanilla Javascript Timer Clock with Break Intervals
let rest = document.querySelector("#break-length")
let session = document.querySelector("#session-length")
let timeLeft = document.querySelector("#time-left")
let start = document.querySelector("#start_stop")
let crement = document.querySelectorAll(".modify")
let reset = document.querySelector("#reset")
let started = false
let timerLabel = document.querySelector("#timer-label")
let sessionIncrement = document.querySelector("#session-increment")
let sessionDecrement = document.querySelector("#session-decrement")
let breakIncrement = document.querySelector("#break-increment")
let breakDecrement = document.querySelector("#break-decrement")
let beep = document.querySelector("#beep")

//Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    timeDisplay()
})

start.addEventListener("click", () => {
    started == true ? started = false : started = true
    ticking()
})

sessionIncrement.addEventListener("click", testupDown)
sessionDecrement.addEventListener("click", testupDown)
breakIncrement.addEventListener("click", testupDown)
breakDecrement.addEventListener("click", testupDown)


function testupDown(e) {
    if (e.currentTarget.getAttribute("id").includes("decrement") && e.currentTarget.nextElementSibling.textContent > 1) {
        e.currentTarget.nextElementSibling.textContent = Number(e.currentTarget.nextElementSibling.textContent) - 1
    }
    else if (e.currentTarget.getAttribute("id").includes("increment") && e.currentTarget.previousElementSibling.textContent < 60) {
        e.currentTarget.previousElementSibling.textContent = Number(e.currentTarget.previousElementSibling.textContent) + 1
    }
    timeRemaining = Number(session.textContent) * 60000
    timeDisplay()
}

reset.addEventListener("click", () => {
    clearInterval(nIntervId)
    started = false
    cycle = session
    rest.textContent = 5
    session.textContent = 25
    timerLabel.textContent = "Session"
    timeRemaining = Number(session.textContent) * 60000
    timeDisplay()
    beep.pause()
    beep.currentTime = 0
})

let nIntervId
let cycle = session
let timeRemaining = Number(session.textContent) * 60000

//Timer Function
function ticking() {
    let goalTime
    if (started) {
        timeRemaining > 1000 ? goalTime = timeRemaining : goalTime = (Number(cycle.textContent) * 60000)
        let endTime = Date.now() + goalTime + 1000
        nIntervId = setInterval(() => {
            let updateDate = new Date()
            timeRemaining = endTime - updateDate
            if (timeRemaining < 1000) {
                timeRemaining = 0
                alarm()
                timeDisplay()
                clearInterval(nIntervId)

                setTimeout(() => {
                    cycle = cycle == session ? rest : session
                    ticking()
                }, 1000)
            } else {
                timeDisplay()
            }
        }, 500)

    } else {
        clearInterval(nIntervId)
    }
}
function alarm() {
    beep.play()
    console.log("times up")
}

function timeDisplay() {
    timerLabel.textContent = cycle == session ? "Session" : "Break"
    let min = Math.floor(timeRemaining / 1000 / 60)
    let sec = Math.floor(timeRemaining / 1000 % 60)
    let display = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`
    timeLeft.textContent = display
    console.log(cycle.getAttribute("id"))
    console.log(display)
}