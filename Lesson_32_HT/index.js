let BigCard_AddBtn = document.querySelector("#BigCard-AddBtn")
let Big_Card = document.getElementById("BigCard-Exampl").innerHTML
let BigCardsContainer = document.querySelector(".Big-Cards-Container")

let Small_Card = document.getElementById("SmallCard-Exmpl").innerHTML;

const GetDataBtn = document.querySelector("#GetDataBtn");
const RemoveAllData = document.querySelector("#RemoveAllData")

document.querySelector(".header").value = "My boards"

function CloseBtn_Function() {
    function Insert_CloseBtn(e) {
        e.target.parentElement.remove()
    }
    CloseBtns = document.querySelectorAll(".CloseBtn")
    CloseBtns.forEach(element => {
        element.addEventListener("click", Insert_CloseBtn)
    });
}

function Insert_SmallCardAddbtn(e) {
    e.target.insertAdjacentHTML("beforebegin", Small_Card)
    CloseBtn_Function()
}

function Small_Card_AddBtnsFunc() {
    let SmallCards_AddBtns = document.querySelectorAll(".SmallCards_AddBtn");
    SmallCards_AddBtns.forEach(element => {
        element.addEventListener("click", Insert_SmallCardAddbtn)
    })

}


BigCard_AddBtn.addEventListener("click", function () {
    this.insertAdjacentHTML("beforebegin", Big_Card)
    CloseBtn_Function();
    Small_Card_AddBtnsFunc();

})

CloseBtn_Function();
Small_Card_AddBtnsFunc();


function GetAllData() {
    let BigCards = document.querySelectorAll(".Big-Card")
    let allData = [];
    _id = 0;
    function Card(name, notes) {
        this.id = _id++;
        this.name = name;
        this.notes = notes;
    }

    for (let i = 0; i < BigCards.length - 1; i++) {
        let SmallCards = BigCards[i].querySelectorAll(".Small-Card")
        let NotesArray = []
        for (let j = 0; j < SmallCards.length; j++) {
            NotesArray.push(SmallCards[j].firstElementChild.value)
        }
        let new_user = new Card(BigCards[i].firstElementChild.value, NotesArray)
        allData.push(new_user)
    }
    return allData
}


GetDataBtn.addEventListener("click", () => {
    console.log(GetAllData())
})

RemoveAllData.addEventListener("click", () => {
    document.querySelector(".header").value = "My boards"
    forDelete = BigCardsContainer.children
    count = BigCardsContainer.children.length
    for (let i = 0; i < count; i++) {
        if (forDelete.length != 1) {
            forDelete[0].remove()
        }
    }
    console.log("All data was cleared")
})

// Saves current data from site in local storage
function SaveCurrentData() {
    const boardName = document.querySelector(".header").value
    let allData = JSON.stringify(GetAllData())
    localStorage.setItem("allData", allData)
    localStorage.setItem("boardName", boardName)
}

document.querySelector("body").addEventListener("click", () => {
    SaveCurrentData()
})
document.querySelector("body").addEventListener("input", () => {
    SaveCurrentData()
})

// Get data from previous activity from local storage and insert it when page is load

function InsertPreviousDataInWholeSite() {
    if (localStorage.getItem("boardName") != "") {
        document.querySelector(".header").value = localStorage.getItem("boardName")
    }
    else {
        document.querySelector(".header").value = "My boards"
    }


    Current_Data = JSON.parse(localStorage.getItem("allData"));
    Current_Data.reverse()
    for (let card of Current_Data) {
        let Big_Card_Copy = document.querySelector("#BigCard-Exampl").children[0];
        Big_Card_Copy = Big_Card_Copy.cloneNode(true);
        Big_Card_Copy.querySelector(".Big-Card-Header").value = card.name
        card.notes.reverse()
        for (let note of card.notes) {
            let Small_Card_Copy = document.querySelector("#SmallCard-Exmpl").children[0];
            Small_Card_Copy = Small_Card_Copy.cloneNode(true)
            Small_Card_Copy.querySelector(".Small-Card-TextArea").value = note
            Big_Card_Copy.insertBefore(Small_Card_Copy, Big_Card_Copy.children[1])
        }

        BigCardsContainer.insertBefore(Big_Card_Copy, BigCardsContainer.children[0])
    }

}

function OnLoad() {
    InsertPreviousDataInWholeSite()
    Small_Card_AddBtnsFunc()
    CloseBtn_Function();
}

window.addEventListener("load", OnLoad)






