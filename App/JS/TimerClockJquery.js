// Jquery Version Pomodoro Clock
let rest = $("#break-length")
let session = $("#session-length")
let timeLeft = $("#time-left")
let start = $("#start_stop")
let crement = $(".modify")
let reset = $("#reset")
let started = false
let timerLabel = $("#timer-label")
let sessionIncrement = $("#session-increment")
let sessionDecrement = $("#session-decrement")
let breakIncrement = $("#break-increment")
let breakDecrement = $("#break-decrement")
let beep = $("#beep")


//Event Listeners
$(document).ready(() => {
    timeDisplay()
})

sessionIncrement.on("click", testupDown)
sessionDecrement.on("click", testupDown)
breakIncrement.on("click", testupDown)
breakDecrement.on("click", testupDown)

start.on("click", () => {
    started == true ? started = false : started = true
    start.toggleClass("default rotate")
    ticking()
})

reset.on("click", () => {
    clearInterval(nIntervId)
    reset.addClass("rotate").one("transitionend", () => {
        reset.removeClass("rotate")
    })

    start.removeClass()
    start.addClass("default")

    started = false
    cycle = session
    rest.text(5)
    session.text(25)
    timerLabel.text("Session")
    timeRemaining = Number(session.text()) * 60000
    timeDisplay()
    beep.pause()
    beep.currentTime = 0
})
// Update timer length function
function testupDown(e) {
    if ($(e.currentTarget).attr("id").includes("decrement") && $(e.currentTarget).next().text() > 1) {
        $(e.currentTarget).next().text(Number($(e.currentTarget).next().text()) - 1)
    }
    else if ($(e.currentTarget).attr("id").includes("increment") && $(e.currentTarget).prev().text() < 60) {
        $(e.currentTarget).prev().text(Number($(e.currentTarget).prev().text()) + 1)
    }
    timeRemaining = Number(session.text()) * 60000
    timeDisplay()
}

let nIntervId
let cycle = session
let timeRemaining = Number(session.text()) * 60000

//Timer Function
function ticking() {
    let goalTime
    if (started) {
        timeRemaining > 1000 ? goalTime = timeRemaining : goalTime = (Number(cycle.text()) * 60000)
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
    timerLabel.text(cycle == session ? "Session" : "Break")
    let min = Math.floor(timeRemaining / 1000 / 60)
    let sec = Math.floor(timeRemaining / 1000 % 60)
    let display = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`
    timeLeft.text(display)
    console.log(cycle.attr("id"))
    console.log(display)
}