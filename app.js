console.log("hi")

//CONSTS
INPUT_STR = "The quick brown fox jumped over the lazy dog"

//Connect elements to JS
keystrokeInput = document.getElementById("input")
buttonFinish = document.getElementById("button_finish")
trialLabel = document.getElementById("progress")
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


function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

// We done... let's upload
let finishSurvey = function() {
    console.log(saved_data)

    var blob = new Blob([JSON.stringify(saved_data)], {type: "application/json"})
}


//Bridge front end and backend
keystrokeInput.onkeydown = keyPress
keystrokeInput.onkeyup = keyRelease

buttonFinish.onclick = finishTrial
buttonReset.onclick = resetTrial