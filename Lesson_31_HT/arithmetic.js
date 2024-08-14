export const Operations = "%^√*/-+"

// Functions that Calculate request and return the answer
export function strToArray(string) {
    let output_array = [];
    let start_flag = 0;
    for (let index = 0; index < string.length; index++) {
        if (string[index].match(/\D/) && index < 1) {
            output_array.push(string[index])
            start_flag = index + 1
        }
        else if (string[index].match(/\D/) && string[index - 1].match(/\D/) && !string[index].includes(".")) {
            output_array.push(string[index])
            start_flag = index + 1
        }
        else if (string[index].match(/\D/) && !string[index].includes(".")) {
            output_array.push(+string.slice(start_flag, index))
            output_array.push(string[index])
            start_flag = index + 1
        }
        else if (index == string.length - 1) {
            output_array.push(+string.slice(start_flag, index + 1))
        }
    }
    return output_array
}

function CalculateWith(array, operation) {
    while (array.includes(operation)) {
        array.forEach((element, i) => {
            if (element == operation) {
                let output_answer = 0
                switch (operation) {
                    case "*":
                        output_answer = array[i - 1] * array[i + 1]
                        break;
                    case "/":
                        output_answer = array[i - 1] / array[i + 1]
                        break;
                    case "+":
                        output_answer = array[i - 1] + array[i + 1]
                        break;
                    case "-":
                        output_answer = array[i - 1] - array[i + 1]
                        break;
                    case "^":
                        output_answer = array[i - 1] ** array[i + 1]
                        break;
                    case "√":
                        output_answer = Math.sqrt(array[i + 1])
                        break;
                    case "%":
                        output_answer = array[i - 1] / 100
                        break;

                }
                if ("+-*/^".split("").includes(operation))
                    array.splice(i - 1, 3, output_answer)
                else if ("√".split("").includes(operation)) {
                    array.splice(i, 2, output_answer)
                }
                else if ("%".split("").includes(operation)) {
                    array.splice(i - 1, 2, output_answer)
                }
            }
        });
    }
    return array
}


export function MainArithmetic(array) {
    let operations = "%^√*/-+".split("")
    for (let operation of operations) {
        array = CalculateWith(array, operation)
    }
    if (array.length == 1) {
        return array[0];
    }
    return "Error"
}