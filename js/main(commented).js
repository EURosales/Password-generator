//outputs
const output = document.getElementById('passwordGenerated');
const clipboardBtn = document.getElementById('clipboard');
//password settings
const length = document.getElementById('length');
const upperCheck = document.getElementById('uppercase');
const lowerCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolCheck = document.getElementById('symbols');
//btn generator
const passwordGeneratorBtn = document.getElementById('btnGenerator');

//Clipboard (old method)
// clipboardBtn.addEventListener('click', () => {
//     const password = output.innerText;
//     const textArea = document.createElement('textArea');

//     if (!password) { return; }

//     textArea.value = password;
//     document.body.appendChild(textArea);
//     textArea.select();
//     document.execCommand('copy');
//     textArea.remove();

//     swal({
//         title: "Your new password has been saved in your clipboard!",
//         icon: "success"
//     });
// });

//Clipboard (New Method)
clipboardBtn.addEventListener('click', () =>{
    const password = output.innerText;
    navigator.clipboard.writeText(password);
    swal({
        title: "Your new password has been saved in your clipboard!",
        icon: "success"
    });
});

//Random char generators
const randomUpperChar = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

const randomLowerChar = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

const randomNumChar = () => {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

const randomSymbolChar = () => {
    const symbols = '!@#$%&*=<?>/';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

//Object
const ramdomCharFunctions = {
    upper: randomUpperChar,
    lower: randomLowerChar,
    number: randomNumChar,
    symbol: randomSymbolChar
}

/*check which settings are active at the
moment of the generator btn is triggered*/

passwordGeneratorBtn.addEventListener('click', () => {
    const passwordLength = +length.value;
    const hasUpper = upperCheck.checked;
    const hasLower = lowerCheck.checked;
    const hasNumber = numbersCheck.checked;
    const hasSymbol = symbolCheck.checked;

    output.innerText = generatePassword(passwordLength, hasUpper, hasLower, hasNumber, hasSymbol);
});

//Main password generator
const generatePassword = (length, upper, lower, number, symbol) => {
    let generatedPassword = '';

    //1.number of checked settings
    const activeSettingsCount = upper + lower + number + symbol;
    if (!activeSettingsCount) {
        return generatedPassword = 'Check at least one setting.';
    }

    //2.find and filter out uncheck types (the ones that are 'false')
    const availableSettingsList = [{ upper }, { lower }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    //3.loop over the given length and call the generator function for each active setting

    for (let i = 0; i < length; i += activeSettingsCount) {
        availableSettingsList.forEach(setting => {

            const settingType = Object.keys(setting)[0];
            generatedPassword += ramdomCharFunctions[settingType]();

        });

    }

    return generatedPassword.slice(0, length);
}