let BigCard_AddBtn = document.querySelector("#BigCard-AddBtn")
let Big_Card = document.getElementById("BigCard-Exampl").innerHTML

let Small_Card = document.getElementById("SmallCard-Exmpl").innerHTML;

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
    Small_Card_AddBtnsFunc()
})

CloseBtn_Function();
Small_Card_AddBtnsFunc()


