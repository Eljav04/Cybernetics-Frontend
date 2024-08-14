import { strToArray, MainArithmetic, Operations } from "./arithmetic.js"

// Functions that check if value contain correct data
function CheckCorrectness(string) {
    const operations = "^√*/-+"
    if (string.length == 0) {
        return true
    }
    if (operations.includes(string[string.length - 1])) {
        return true
    }
    return false;
}

// Function that show in calculator previous input request
function CreatePreviousInput(array) {
    let output_text = ""

    for (let element of array) {
        if (Operations.includes(element)) {
            output_text += `<span>${element}</span>`
        }
        else {
            output_text += element
        }
    }
    return (output_text)
}

//Function that add previous request in history
function EventForHistoryElement() {
    function ChooseThisHistoryElement(e) {
        let chosen_request = e.target.innerText
        IntOut_Area.value = chosen_request
    }
    let HistoryElements = document.querySelectorAll(".HistoryElement")
    HistoryElements.forEach(element => {
        element.addEventListener("click", ChooseThisHistoryElement)
    })
}

let HistoryElement_Container = document.querySelector(".HistoryElement-Container")
function AddRequestInHistory(request) {
    let HistoryElementCard = `<li class="HistoryElmentCard">
                        <p class="HistoryElementCount">
                            ${request.id}
                        </p>
                        <button class="HistoryElement">
                            <p class="HistoryElementRequest">
                                ${CreatePreviousInput(request.request)}
                            </p>
                            <p class="HistoryElementAnswer">
                                =${request.answer}
                            </p>
                        </button>
                    </li>`
    HistoryElement_Container.insertAdjacentHTML("beforeend", HistoryElementCard)
    EventForHistoryElement()
}



//Clear all history
let ClearHistoryBtn = document.querySelector("#ClearHistoryBtn")
ClearHistoryBtn.addEventListener("click", () => {
    let HistoryChildren = HistoryElement_Container.children
    let count = HistoryChildren.length
    for (let i = 1; i < count; i++) {
        HistoryChildren[1].remove()
    }
    All_Data = [];
    _id = 1;
})

// Adding events and some additional functions
let IntOut_Area = document.querySelector("#IntOut_Area");
let PrevOut_Area = document.querySelector(".PrevOut_Area")
let NumberBtns = document.querySelectorAll(".NumberBtn");

let AriphmeticOperator = document.querySelectorAll(".AriphmeticOperator")
let AdditionalOperatorsBtn = document.querySelectorAll(".AdditionalOperatorsBtn")
let EqualBtn = document.querySelector("#EqualBtn")

let AllClearBtn = document.querySelector("#AllClearBtn");
let ClearBtn = document.querySelector("#ClearBtn");

let All_Data = []
let _id = 1;

function PrevInpAnimation() {
    let timer = null;
    let element = PrevOut_Area.style
    element.position = "relative"
    element.top = "-20rem"
    element.opacity = "0%"
    let pos = 20
    let opacity = 0
    clearInterval(timer)
    setInterval(function () {
        if (pos > 0) {
            element.top = `${-pos}rem`
            element.opacity = `${opacity * 5}%`
            pos--
            opacity++
        }
        else {
            clearInterval(timer)
        }
    }, 20)
}

function WriteInnerText(event) {
    IntOut_Area.value = IntOut_Area.value.replace("Error", "")
    IntOut_Area.value += event.target.innerText
}

NumberBtns.forEach(Btn => {
    Btn.addEventListener("click", WriteInnerText)
})

AriphmeticOperator.forEach(Btn => {
    Btn.addEventListener("click", WriteInnerText)
})

AdditionalOperatorsBtn.forEach(Btn => {
    Btn.addEventListener("click", WriteInnerText)
})

AllClearBtn.addEventListener("click", () => {
    IntOut_Area.value = ""
    PrevOut_Area.style.opacity = "0%";
})

ClearBtn.addEventListener("click", () => {
    IntOut_Area.value = IntOut_Area.value.slice(0, IntOut_Area.value.length - 1)
})

// Calculate, show previous and add in history request
function EqualFunction() {
    let current_value = IntOut_Area.value.replace("=", "");
    let previous_value = IntOut_Area.value.replace("=", "");
    if (CheckCorrectness(current_value)) {
        IntOut_Area.value = "Error";
    }
    else {
        if (current_value[0].match(/\D/) && current_value[0] != "√") {
            current_value = "0" + current_value
        }
        current_value = strToArray(current_value);
        let output_value = MainArithmetic(current_value);

        if (isNaN(output_value)) {
            IntOut_Area.value = "Error"
        }
        else {
            IntOut_Area.value = "=" + output_value;
            console.log(current_value);

            PrevOut_Area.innerHTML = CreatePreviousInput(previous_value)
            PrevInpAnimation()

            const obj = { id: _id++, request: previous_value, answer: output_value }
            All_Data.push(obj)

            AddRequestInHistory(obj)

        }
    }
}

EqualBtn.addEventListener("click", EqualFunction)

// Add functionality via ketboard
let previous_key = ""
document.querySelector("body").addEventListener("keydown", (e) => {
    if (e.key.match(/\d/) || Operations.includes(e.key)) {
        IntOut_Area.value += e.key
    }
    if (e.key == "Enter" || e.key == "=") {
        EqualFunction()
    }

    if (e.key == "Backspace") {
        IntOut_Area.value = IntOut_Area.value.slice(0, IntOut_Area.value.length - 1)
    }

    if (previous_key == "Alt" && e.key == "Backspace") {
        IntOut_Area.value = ""
        PrevOut_Area.style.opacity = "0%";
    }

    if (e.key == "Meta") {
        console.log(All_Data)
        console.log(screen.width)
    }

    previous_key = e.key
})


