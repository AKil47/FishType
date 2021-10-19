console.log("hi")
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

import * as firebase from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDRIE-PU1zxFCGxdNJ6yQ_CgAge2e0CSlQ",
    authDomain: "fishtype-3f3cb.firebaseapp.com",
    projectId: "fishtype-3f3cb",
    storageBucket: "fishtype-3f3cb.appspot.com",
    messagingSenderId: "13886084546",
    appId: "1:13886084546:web:54f372329cd56d7887725b"
  };
firebase.initializeApp(firebaseConfig)


//CONSTS
const INPUT_STR = "The quick brown fox jumped over the lazy dog"
const TRIAL_COUNT = 5

//Connect elements to JS
const keystrokeInput = document.getElementById("input")
const buttonFinish = document.getElementById("button_finish")
const trialLabel = document.getElementById("progress")
const buttonReset = document.getElementById("button_reset")



let currentTrial = 1

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
    } else {
        let date = Date.now()
        new_data.push(["PRESS", currentTrial, e.keyCode, date])
    }
}


//User Interaction states
let finishTrial = function() {
    if (keystrokeInput.value  == INPUT_STR) {
        saved_data = saved_data.concat(new_data)

        if (currentTrial == TRIAL_COUNT) {
            finishSurvey()
        }
        else {
            incrementTrial()
        }
        resetTrial()

    } else {
        userFail()
    }
}

let userFail = function() {
    alert("Error, please try again.")
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
let finishSurvey = async function() {
    console.log(saved_data)

    var blob = new Blob([JSON.stringify(saved_data)], {type: "application/json"})

    // var storageRef = firebase.storage().ref();

    // var fileRef = storageRef.child("/files/my-file.json")
    // fileRef.put(blob).then(function(snapshot) {
    //     console.log('Uploaded a blob!');
    // });

    const storage = getStorage();
    const storageRef = ref(storage, create_UUID());

    await uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });

    window.location.href += "redirect";
}



//Bridge front end and backend
keystrokeInput.onkeydown = keyPress
keystrokeInput.onkeyup = keyRelease

buttonFinish.onclick = finishTrial
buttonReset.onclick = resetTrial