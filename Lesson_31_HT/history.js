let CalculatorContainer = document.querySelector(".Calculator-Container")
let BG_BlurShadow = document.querySelector(".BG-BlurShadow")

let History_Container = document.querySelector(".History-Container")
let HistoryElement_Container = document.querySelector(".HistoryElement-Container")
let HistoryBtn = document.querySelector(".HistoryBtn")


let CloseHistoryBtn = document.querySelector("#CloseHistoryBtn")

History_Container.style.height = window.getComputedStyle(CalculatorContainer).height

function OpenHistory() {
    let pos = 0;
    let timer = null;
    clearInterval(timer)
    timer = setInterval(() => {
        if (pos < 200) {
            History_Container.style.right = `${-pos}rem`

            CalculatorContainer.style.left = `${-pos}rem`
            BG_BlurShadow.style.left = `${-pos}rem`
            pos++
            History_Container.style.opacity = pos / 200
        }
        else {
            clearInterval(timer)
        }
    }, 2)
}

function CloseHistory() {
    let pos = 200;
    let timer = null;
    clearInterval(timer)
    timer = setInterval(() => {
        if (pos > 0) {
            History_Container.style.right = `${-pos}rem`

            CalculatorContainer.style.left = `${-pos}rem`
            BG_BlurShadow.style.left = `${-pos}rem`
            pos--
            History_Container.style.opacity = pos / 200
        }
        else {
            clearInterval(timer)
        }
    }, 2)
}

let isClose = true;
HistoryBtn.addEventListener("click", () => {
    if (isClose) {
        OpenHistory()
        isClose = false;
    }
    else {
        CloseHistory()
        isClose = true;
    }
})

CloseHistoryBtn.addEventListener("click", () => {
    CloseHistory()
    isClose = true;
})

document.querySelector("body").addEventListener("keydown", (e) => {
    if (e.key == "h" || e.key == "H"
    ) {
        if (isClose) {
            OpenHistory()
            isClose = false;
        }
        else {
            CloseHistory()
            isClose = true;
        }
    }
})
