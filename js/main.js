const output = document.getElementById('passwordGenerated');
const clipboardBtn = document.getElementById('clipboard');
const length = document.getElementById('length');
const upperCheck = document.getElementById('uppercase');
const lowerCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolCheck = document.getElementById('symbols');
const passwordGeneratorBtn = document.getElementById('btnGenerator');

clipboardBtn.addEventListener('click', () => {
    const password = output.innerText;
    const textArea = document.createElement('textArea');

    if (!password) { return; }

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();

    swal({
        title: "Your new password has been saved in your clipboard!",
        icon: "success"
    });
});

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

const ramdomCharFunctions = {
    upper: randomUpperChar,
    lower: randomLowerChar,
    number: randomNumChar,
    symbol: randomSymbolChar
}

passwordGeneratorBtn.addEventListener('click', () => {
    const passwordLength = +length.value;
    const hasUpper = upperCheck.checked;
    const hasLower = lowerCheck.checked;
    const hasNumber = numbersCheck.checked;
    const hasSymbol = symbolCheck.checked;

    output.innerText = generatePassword(passwordLength, hasUpper, hasLower, hasNumber, hasSymbol);
});

const generatePassword = (length, upper, lower, number, symbol) => {
    let generatedPassword = '';

    const activeSettingsCount = upper + lower + number + symbol;
    if (!activeSettingsCount) {
        return generatedPassword = 'Check at least one setting.';
    }

    const availableSettingsList = [{ upper }, { lower }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    for (let i = 0; i < length; i += activeSettingsCount) {
        availableSettingsList.forEach(setting => {

            const settingType = Object.keys(setting)[0];
            generatedPassword += ramdomCharFunctions[settingType]();

        });
    }

    return generatedPassword.slice(0, length);
}