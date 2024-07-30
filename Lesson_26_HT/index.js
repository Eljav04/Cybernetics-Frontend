let users = [];
let _id = 0;

let inputs = document.querySelectorAll("input")
let table = document.querySelector("table")
let table_body = document.querySelector("#table-body")
let show_button = document.querySelector("#show_button")

// Functions releted with checking correctness written info in every input
function CheckCorrectness_Name(name) {
    if (name.match(/\W/) || name.match(/\d/) || name.length < 1) {
        return false
    }
    return true
}

function CheckCorrectness_Age(age) {
    if (age.match(/\D/g) || age.length < 1 || age < 0 || age > 200) {
        return false
    }
    return true
}

function checkPhoneNumber(userNumber) {
    let numbers = "1234567890".slice("")

    if (userNumber.slice(0, 1) != "+") {
        if (userNumber.length != 10) {
            console.log(`Your number is not proper count of numbers: ${userNumber.length}`)
            return false
        }
    }
    if (userNumber.length != 13 && userNumber.slice(0, 1) == "+") {
        console.log(`Your number is not proper count of numbers: ${userNumber.length}`)
        return false
    }
    for (let i = 1; i < userNumber.length; i++) {
        if (!numbers.includes(userNumber[i])) {
            console.log("Your number is not a number char")
            return false
        }
    }
    if (userNumber.slice(1, 4) != "994" && userNumber.slice(0, 1) == "+") {
        console.log("Your number is not Azerbaijany number")
        return false
    }
    if (userNumber.slice(4, 5) == "0" && userNumber.slice(0, 1) == "+") {
        console.log("Your number is incorrect")
        return false
    }
    return true
}

// Functions that show with color correctness written info in inputs
function Show_Color(input, isTrue) {
    if (input.value.length < 1) {
        input.setAttribute("style", "border-bottom: 2px solid rgb(196, 191, 193);");
    }
    else if (isTrue) {
        input.setAttribute("style", "border-bottom: 2px solid green;");
    }
    else {
        input.setAttribute("style", "border-bottom: 2px solid red;");
    }
}

inputs[0].oninput = function () {
    let current_name = inputs[0].value
    isTrue = CheckCorrectness_Name(current_name)
    Show_Color(inputs[0], isTrue)
}

inputs[1].oninput = function () {
    let current_name = inputs[1].value
    isTrue = CheckCorrectness_Name(current_name)
    Show_Color(inputs[1], isTrue)
}

inputs[2].oninput = function () {
    let current_age = inputs[2].value
    isTrue = CheckCorrectness_Age(current_age)
    Show_Color(inputs[2], isTrue)
}

inputs[3].oninput = function () {
    let current_number = inputs[3].value;
    isTrue = checkPhoneNumber(current_number)
    Show_Color(inputs[3], isTrue)
}

// Creating User object and addding every object in array form inputs
function User(name, surname, age, number) {
    this.id = _id++;
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.number = number;
}
function AddUser_ToArray(name, surname, age, number) {
    users.push(new User(name, surname, age, number))
}


function Submit_and_AppendUsers() {
    if (!CheckCorrectness_Name(inputs[0].value)) {
        alert("You are have a mistake. Please try again!")
        return 0
    }

    if (!CheckCorrectness_Name(inputs[1].value)) {
        alert("You are have a mistake. Please try again!")
        return 0
    }

    if (!CheckCorrectness_Age(inputs[2].value)) {
        alert("You are have a mistake. Please try again!")
        return 0
    }

    if (!checkPhoneNumber(inputs[3].value)) {
        alert("You are have a mistake. Please try again!")
        return 0
    }

    AddUser_ToArray(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value)
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ""
        inputs[i].setAttribute("style", "border-bottom: 2px solid rgb(196, 191, 193);");
    }
    console.log(users)
    table_body.innerHTML += `<tr>
                    <td>${users[users.length - 1].id}</td>
                    <td>${users[users.length - 1].name}</td>
                    <td>${users[users.length - 1].surname}</td>
                    <td>${users[users.length - 1].age}</td>
                    <td>${users[users.length - 1].number}</td>
                </tr>`
}


// Show and close table button

function Show_Or_Close() {
    if (table.style.display != "table") {
        table.style.display = "table"
    }
    else {
        table.style.display = "none"
    }
}






