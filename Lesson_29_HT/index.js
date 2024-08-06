let BigCard_AddBtn = document.querySelector("#BigCard-AddBtn")
let Big_Card = document.getElementById("BigCard-Exampl").innerHTML

let Small_Card = document.getElementById("SmallCard-Exmpl").innerHTML;

const GetDataBtn = document.querySelector("#GetDataBtn");

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