'use strict'

// BANKIST APP

// Data
const account1 = {
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    owner: 'David Ouma',
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Odhis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Ndegwa',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Mutisya',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
    containerMovements.innerHTML = ' ';

    movements.forEach((movement, i) => {


        const movementType = movement > 0 ? 'deposit' : 'withdrawal ';
        const htmlTemplate = `
        <div class="movements__row">
                <div class="movements__type movements__type--${movementType}">${i + 1} ${movementType}</div>
                <div class="movements__value">${movement}</div>
        </div>`;
        containerMovements.insertAdjacentHTML('afterbegin',   htmlTemplate)
    })
}
//create eurUSD rate 

const eurUSD = 1.14

//USING THE MAP METHODS

const userName = 'Samuel Mbure';

const createUserName = function (accs) {


    accs.forEach(acc => {
        acc.username = acc.owner.toUpperCase().split(' ').map(name => name[0]).join('');
    })
    // const initializeName = accs.toLowerCase().split(' ').map(name => name[0]).join('')

    // return initializeName.toUpperCase();

}

createUserName(accounts)

//USING THE FILTER METHOD
// creating the deposit arrays
const createDeposits = function (accs) {
    accs.forEach(acc => {
        acc.deposits = acc.movements.filter(deps => deps > 0)
    })
}

const movements =  [200, 450, -400, 3000, -650, -130, 70, 1300]

const deposits = movements.filter(mov => {
    return mov > 0
})


//creating the withdrawal arrays

const createWithdrawals = function(accs) {

    accs.forEach(acc => acc.withdrawals = acc.movements.filter( movs => movs < 0))
}

//USING THE REDUCE METHOD(snowball)
//addition

const accBalance = movements.reduce((acc, currentValue) => {
    return acc + currentValue;
}, 0); // the 0 indicates the value of the initial value


console.log(accBalance)

const calcPrintBalance = function (acc) {

	acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
    labelBalance.textContent = `$${acc.balance}`
    
}



//getting the maximum value 

const maxVal = movements.reduce((acc, mov) => acc > mov ? acc : mov, movements[0])

console.log(maxVal)

//getting the bank balance in usd


const bankBalnceUSD = function (accs) {
	accs.forEach(acc => acc.bankBalnceUSD = acc.movements.map(mov => mov * eurUSD).filter(mov => mov > 0).reduce((acc, val) => acc + val), 0);
}


//display the incomes 

const calcdisplaySummary = function (acc) {
	//income display
	const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, val) => acc + val, 0);
	labelSumIn.textContent = `${incomes}€`;

	//outcome display 
	const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, val) => acc + val, 0);
	labelSumOut.textContent = `${Math.abs(outcomes)}€`;

	//interest 

	const interest = acc.movements.filter(mov => mov > 0).map(mov => mov * acc.interest/100).filter(interest => interest >= 1).reduce((acc, val) => acc + val, 0);
	labelSumInterest.textContent = `${interest}`
}


// //display the outgoing 

// const calcdisplayOut = function (movements) {
// 	const outcomes = movements.filter(mov => mov < 0).reduce((acc, val) => acc + val, 0);
// 	labelSumOut.textContent = `${outcomes}€`;
// }

// calcdisplayOut(account1.movements);

// //display the interest 

// const calcdisplayInterst = function (acc) {
// 	const interest = acc.movements.filter(mov => mov > 0).reduce((acc, val) => acc + val,0) - acc.movements.filter(mov => mov < 0).reduce((acc, val) => acc + val, 0) * acc.interestRate;

// 	labelSumInterest.textContent = `${interest}€`;
// }

// calcdisplayInterst(account4)

const firstWithdrawl = movements.find(mov => mov < 0) // unlike the filter method that retuns a new array the find method will only return the first element that fulfills the condition

console.log(movements)
console.log(firstWithdrawl);

const account = accounts.find(acc => acc.owner === 'Steven Ndegwa');

console.log(account);

const findAccount = function () {

	for (const account of accounts) {

		if (account.owner === 'Steven Ndegwa') {
			console.log(account)
		}
	}

}

findAccount(); 

//Even Handlers 

let currentAccount;

btnLogin.addEventListener('click', (e) => {
	//Prevents form from subbmitting
	e.preventDefault()
	
	currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

	console.log(currentAccount)

	if (currentAccount?.pin === Number(inputLoginPin.value)) {
		console.log(`Hello Mr.${currentAccount.owner.split(' ')[1]}, welcome to SUbsidian Bank`);

		// DISPLAY UI AND WELCOME MESSAGE
		labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;

		// CLEAR INPUT FIELDS
		inputLoginUsername.value = inputLoginPin.value = ''
		inputLoginPin.blur();
		
		// DISPLAY MOVEMENTS
		containerApp.style.opacity = 100
		displayMovements(currentAccount.movements);
		// DISPLAY BALANCE
		calcPrintBalance(currentAccount);
		//  DISPLAY SUMMARY
		calcdisplaySummary(currentAccount); 
	}
})

btnTransfer.addEventListener('click', function (e) {
	e.preventDefault();
	const amount = Number(inputTransferAmount.value);
	const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
	inputTransferTo.value = inputTransferAmount.value = '';

	if (amount > 0 && receiverAcc && amount <= currentAccount.balance && receiverAcc?.username !== currentAccount.username) {
		// Doing the transfer
		currentAccount.movements.push(-amount);
		receiverAcc.movements.push(amount);
		containerApp.style.opacity = 100;
		displayMovements(currentAccount.movements);
		calcPrintBalance(currentAccount);
		calcdisplaySummary(currentAccount);
	}
});

btnClose.addEventListener('click', (e) => {
	e.preventDefault();

	if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
		const index = accounts.findIndex(acc => acc.username === currentAccount.username);
		console.log(index)

		// delete the account
		accounts.splice(index, 1);
		console.log(accounts)

		//hide the ui
		containerApp.style.opacity = 0

		// hide the welcome message

		labelWelcome.textContent = 'login to get started'
	}
})