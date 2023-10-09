/*initialise global variables*/
const pink = "rgb(231, 0, 100)";
let nameValid = false;
let emailValid = false;
let cardValid = false;

function validateName() {
    /*initialise neccessary variables and check nameValid == false*/
    let input = document.getElementById("name");
    let nameInput = input.value;
    let inputArray = nameInput.split(" ");
    console.log(input.style.backgroundColor);

    checkNameLength(inputArray);

    if(nameValid == true) {
        checkCharacters(nameInput);
    }

    if(nameValid == false) {
        input.style.backgroundColor = pink;
    } else {
        input.style.backgroundColor = "white";
    }
    
}

function checkNameLength(inputArray) {
/*check name array for length related to number of names entered and
length of names entered*/
    if (inputArray.length > 1) {
        if ((inputArray[0].length > 1) && (inputArray[inputArray.length - 1].length > 1) && (inputArray[1].length > 1)) {
            nameValid = true;
        } else {
            nameValid = false;
        }
    } else {
        nameValid = false;
    }
}

function checkCharacters(nameInput) {
/*check name input for illegal characters permitted characters are
 !#$%&'*+-/=?^_`{|}~ and upper and lower case letters*/
    let regExp = /[^a-zA-Z #$%&'*+-/=?^_`{|}~]/;

    if (regExp.test(nameInput)) {
        nameValid = false;
    } else {
        nameValid = true;
    }

}

function validateEmail() {
/*use email input type to check email validity*/
    let input = document.getElementById("email");
    emailValid = input.validity.valid;
    if (input.value.includes(".com") || input.value.includes(".co.uk")) {
            emailValid = true;
    } else {
        emailValid = false;
    }
    if (emailValid != true) {
        input.style.backgroundColor = pink;
    } else {
        input.style.backgroundColor = "white";
    }
    
}

function validateCard() {
/*initialise neccessary variables and prep input for operations*/
    let input = document.getElementById("card");

    if (input.value.length == 16) {
        cardValid = true;
    } else {
        cardValid = false;
    }

    let inputArray = input.value.split('');
    inputArray = inputArray.reverse();
    console.log(inputArray);

    let luhnTotal = luhnInput(inputArray);
    if (luhnTotal % 10 == 0) {
        cardValid = true;
    } else {
        cardValid = false;
    }

    if (cardValid == false) {
        input.style.backgroundColor = pink;
    } else {
        input.style.backgroundColor = "white";
    }
}

function luhnInput(inputArray) {
    for (let i = 0; i < inputArray.length; i++) {
        inputArray[i] = Number(inputArray[i]);
        if (i % 2 != 0) {
            inputArray[i] = inputArray[i] * 2;
        }
        if (inputArray[i] > 9) {
            let toSplit = inputArray[i];
            toSplit = toSplit.toString();
            let splitNum = toSplit.split('');
            inputArray[i] = Number(splitNum[0]) + Number(splitNum[1]);
        }
    }
    console.log(inputArray);
    let luhnTotal = inputArray.reduce(getSum);
    console.log(luhnTotal);
    return luhnTotal;
}

function getSum(total, num) {
    return total +  num;
}

function decideEmail() {
    /*decide whether to send email based on previous validation
    prevents page refresh on incorrect entry*/
    let form = document.getElementById("detailsForm");
    if ((cardValid == true) && (emailValid == true) && (nameValid == true)) {
        form.action = "mailto:challenge@dn-uk.com";
        console.log("email sent");
    } else {
        event.preventDefault();
        console.log("email not sent");
    }
}