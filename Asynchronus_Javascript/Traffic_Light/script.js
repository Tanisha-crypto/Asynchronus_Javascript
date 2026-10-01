const red = document.querySelector("#red")
const yellow = document.querySelector("#yellow")
const green = document.querySelector("#green")

const statusText = document.querySelector("#statusText")
const timer = document.querySelector("#timer")

const startBtn = document.querySelector("#start")
const stopBtn = document.querySelector("#stop")
const resetBtn = document.querySelector("#reset")


let interval = null
let time = 5
let currentLight = "red"


function showLight(light) {

    red.classList.remove("active")
    yellow.classList.remove("active")
    green.classList.remove("active")


    if (light === "red") {

        red.classList.add("active")
        statusText.textContent = "STOP"

    }

    if (light === "yellow") {

        yellow.classList.add("active")
        statusText.textContent = "READY"

    }

    if (light === "green") {

        green.classList.add("active")
        statusText.textContent = "GO"

    }
}


function startTrafficLight() {

    if (interval !== null) {
        return
    }

    showLight(currentLight)

    interval = setInterval(function () {

        time--

        timer.textContent = time


        if (time === 0) {

            if (currentLight === "red") {

                currentLight = "green"
                time = 5

            }
            else if (currentLight === "green") {

                currentLight = "yellow"
                time = 2

            }
            else if (currentLight === "yellow") {

                currentLight = "red"
                time = 5

            }

            showLight(currentLight)

            timer.textContent = time
        }

    }, 1000)
}


function stopTrafficLight() {

    clearInterval(interval)

    interval = null
}


function resetTrafficLight() {

    clearInterval(interval)

    interval = null

    currentLight = "red"
    time = 5

    showLight("red")

    timer.textContent = time
}


startBtn.addEventListener("click", function () {

    startTrafficLight()

})


stopBtn.addEventListener("click", function () {

    stopTrafficLight()

})


resetBtn.addEventListener("click", function () {

    resetTrafficLight()

})


showLight("red")