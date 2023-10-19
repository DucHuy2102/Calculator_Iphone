const hourElement = document.querySelector('.hour');
const minuteElement = document.querySelector('.minute');
const displayElement = document.querySelector('.display');
const acElement = document.querySelector('.ac');
const pmElement = document.querySelector('.pm');
const percentElement = document.querySelector('.percent');
const divisionElement = document.querySelector('.division');
const number_7 = document.querySelector('.number-7');
const number_8 = document.querySelector('.number-8');
const number_9 = document.querySelector('.number-9');
const multiplicationElement = document.querySelector('.multiplication');
const number_4 = document.querySelector('.number-4');
const number_5 = document.querySelector('.number-5');
const number_6 = document.querySelector('.number-6');
const subtractionElement = document.querySelector('.subtraction');
const number_1 = document.querySelector('.number-1');
const number_2 = document.querySelector('.number-2');
const number_3 = document.querySelector('.number-3');
const additionElement = document.querySelector('.addition');
const number_0 = document.querySelector('.number-0');
const decimalButton = document.querySelector('.decimal');
const equalElement = document.querySelector('.equal');

const numberArray = [
    number_0,
    number_1,
    number_2,
    number_3,
    number_4,
    number_5,
    number_6,
    number_7,
    number_8,
    number_9,
];

// variables
let valueInMemory = null;
let operatorInMemory = null;

// functions
const getValueAsStr = () => {
    const currentDisplayStr = displayElement.textContent;
    return currentDisplayStr.split(',').join('');
};

const getValueAsNum = () => {
    return parseFloat(getValueAsStr());
};

const setStrAsValue = (valueStr) => {
    if (valueStr[valueStr.length - 1] === '.') {
        displayElement.textContent += '.';
        return;
    }
    const [wholeNumStr, decimalStr] = valueStr.split('.');
    if (decimalStr) {
        displayElement.textContent = parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
    } else {
        displayElement.textContent = parseFloat(valueStr).toLocaleString();
    }
};

const handleNumberClick = (numberStr) => {
    const currentDisplay = getValueAsStr();
    if (currentDisplay === '0') {
        setStrAsValue(numberStr);
    } else {
        setStrAsValue(currentDisplay + numberStr);
    }
};

const getResultAsStr = () => {
    const currentValueNum = getValueAsNum();
    const valueNumInMemmory = parseFloat(valueInMemory);
    let newValueNum;
    if (operatorInMemory === 'addition') {
        newValueNum = valueNumInMemmory + currentValueNum;
    } else if (operatorInMemory === 'subtraction') {
        newValueNum = valueNumInMemmory - currentValueNum;
    } else if (operatorInMemory === 'multiplication') {
        newValueNum = valueNumInMemmory * currentValueNum;
    } else if (operatorInMemory === 'division') {
        newValueNum = valueNumInMemmory / currentValueNum;
    }
    return newValueNum.toString();
};

const handleOperatorClick = (operation) => {
    const currentValueStr = getValueAsStr();
    if (!valueInMemory) {
        valueInMemory = currentValueStr;
        operatorInMemory = operation;
        setStrAsValue('0');
        return;
    }
    valueInMemory = getResultAsStr();
    operatorInMemory = operation;
    setStrAsValue('0');
};

// add event to functions
acElement.addEventListener('click', () => {
    setStrAsValue('0');
    valueInMemory = null;
    operatorInMemory = null;
});

percentElement.addEventListener('click', () => {
    const currentNumber = getValueAsNum();
    const newNumber = currentNumber / 100;
    setStrAsValue(newNumber.toString());
    valueInMemory = null;
    operatorInMemory = null;
});

pmElement.addEventListener('click', () => {
    const currentNumber = getValueAsNum();
    const currentValueStr = getValueAsStr();
    if (currentValueStr === '-0') {
        setStrAsValue('0');
        return;
    }
    if (currentNumber >= 0) {
        setStrAsValue('-' + currentValueStr);
    } else {
        setStrAsValue(currentValueStr.substring(1));
    }
});

// add event to operators
additionElement.addEventListener('click', () => {
    handleOperatorClick('addition');
});
subtractionElement.addEventListener('click', () => {
    handleOperatorClick('subtraction');
});
multiplicationElement.addEventListener('click', () => {
    handleOperatorClick('multiplication');
});
divisionElement.addEventListener('click', () => {
    handleOperatorClick('division');
});
equalElement.addEventListener('click', () => {
    if (valueInMemory) {
        setStrAsValue(getResultAsStr());
        valueInMemory = null;
        operatorInMemory = null;
    }
});

// add event
for (let i = 0; i < numberArray.length; i++) {
    const number = numberArray[i];
    number.addEventListener('click', () => {
        handleNumberClick(i.toString());
    });
}
decimalButton.addEventListener('click', () => {
    const currentValueStr = getValueAsStr();
    if (!currentValueStr.includes('.')) {
        setStrAsValue(currentValueStr + '.');
    }
});

// set time
const updateTime = () => {
    const currentTime = new Date();
    let currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    if (currentHour > 12) {
        currentHour -= 12;
    }

    hourElement.textContent = currentHour.toString();
    minuteElement.textContent = currentMinute.toString().padStart(2, '0');
};
setInterval(updateTime, 1000);
updateTime();
