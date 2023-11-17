// Vanilla Javascript Timer Clock with Break Intervals
let rest = document.querySelector("#break-length")
let session = document.querySelector("#session-length")
let started = false

let start = document.querySelector("#start_stop")
let crement = document.querySelectorAll(".modify")

//Event Listners
start.addEventListener("click", ticking)

crement.forEach((crement) => {
    crement.addEventListener("click", upDown)
})


//Functions for the event listners
function upDown(e) {
    if (!started) {
        if (e.target.classList.contains("fa-chevron-up")) {
            e.currentTarget.previousElementSibling.textContent = Number(e.currentTarget.previousElementSibling.textContent) + 1
        }
        else if (e.currentTarget.nextElementSibling.textContent > 1) {
            e.currentTarget.nextElementSibling.textContent = Number(e.currentTarget.nextElementSibling.textContent) - 1
        }
    }
}


let nIntervId
//Timer Function
function ticking() {
    started == true ? started = false : started = true
    if (started) {
        let endTime = new Date().setMinutes(new Date().getMinutes() + Number(session.textContent))
        let currentDate = new Date()
        nIntervId = setInterval(() => {
            let updateDate = new Date()
            let timeRemaining = endTime - updateDate
            if (timeRemaining < 1) {
                endTime = new Date().setMinutes(new Date().getMinutes() + Number(rest.textContent))
                currentDate = new Date()
            }
            console.log(timeRemaining / 1000)
        }, 1000)
    } else {
        clearInterval(nIntervId)
    }
}
