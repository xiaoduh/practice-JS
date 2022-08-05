const dataLowercase = "azertyuiopqsdfghjklmwxcvbn";
const dataUppercase = dataLowercase.toUpperCase();
const dataNumbers = '0123456789';
const dataSymbols = "²&é\"'(-è_ççà)à=$ù*!:;,(";
const rangeValue = document.getElementById('password-length');
let password = "";
const passwordOutput = document.getElementById('password-output');

function generatePassword() {
let data = [];
password = "";

if(lowercase.checked) data.push(...dataLowercase);
if(uppercase.checked) data.push(...dataUppercase);
if(numbers.checked) data.push(...dataNumbers);
if(symbols.checked) data.push(...dataSymbols);

if( data.length === 0) {
    alert('Veuillez saisir des données !');
} else {
    for(i=  0; i < rangeValue.value; i++) {
        password += data[Math.floor(Math.random() * data.length)];
    }
}
passwordOutput.value = password;

passwordOutput.select();
document.execCommand("copy");

}

generateButton.addEventListener("click", generatePassword);

function recursive(x) {
    if (x === 0) return 1;
    return  x * recursive(x-1);
}

console.log(recursive(3));
