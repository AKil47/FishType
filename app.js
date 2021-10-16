console.log("hi")

//CONSTS
INPUT_STR = "The quick brown fox jumped over the lazy dog"

//Connect elements to JS
keystrokeInput = document.getElementById("keystroke_input")
buttonFinish = document.getElementById("button_finish")
trialLabel = document.getElementById("trial_label")
buttonReset = document.getElementById("button_reset")



let currentTrial = 0

let saved_data  = []
let new_data = []


//Capture Functions
let keyRelease = function(e) {
    let date = Date.now()
    new_data.push(["RELEASE", currentTrial, e.keyCode, date])
}

let keyPress = function(e) {
    if (e.keyCode == 8) {
        userFail()
    }
    let date = Date.now()
    new_data.push(["PRESS", currentTrial, e.keyCode, date])
}


//User Interaction states
let finishTrial = function() {
    if (keystrokeInput.value  == INPUT_STR) {
        saved_data = saved_data.concat(new_data)

        if (currentTrial == 7) {
            finishSurvey()
        }
        else {
            incrementTrial()
            resetTrial()
        }

    } else {
        userFail()
    }
}

let userFail = function() {
    alert("NO")
    resetTrial()
}

let resetTrial = function() {
    keystrokeInput.value = ""
    new_data = []
}

let incrementTrial = function() {
    keystrokeInput.value = ""
    currentTrial += 1
    trialLabel.innerText = "Current Trial: " + currentTrial
}


// We done... let's upload
let finishSurvey = function() {
    console.log(saved_data)
}


//Bridge front end and backend
keystrokeInput.onkeydown = keyPress
keystrokeInput.onkeyup = keyRelease

buttonFinish.onclick = finishTrial
buttonReset.onclick = resetTrial