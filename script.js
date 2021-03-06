'use strict'

// BANKIST APP

// Data
const account1 = {
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  owner: 'David Ouma',
  interestRate: 1.2, // %
	pin: 1111,
  movementsDates: [
    '2021-11-18T21:31:17.178Z',
    '2021-12-23T07:42:02.383Z',
    '2022-01-01T10:17:24.185Z',
    '2022-01-08T14:11:59.604Z',
    '2022-01-28T09:15:04.904Z',
    '2022-02-01T17:01:17.194Z',
    '2022-02-01T23:36:17.929Z',
    '2022-02-02T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'de-DE',
};

const account2 = {
  owner: 'Jessica Odhis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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

console.log(account1)

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.balance__date');
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

const dateformatter = function(anyDate, locale) {
	const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));
	const pastDays = calcDaysPassed(new Date(), anyDate);

	if (pastDays === 0) return `Today`;
	if (pastDays === 1) return 'Yesterday';
	if (pastDays <= 7) return `${pastDays} days ago`;
	else {
		return new Intl.DateTimeFormat(locale).format(anyDate);
	}
}
function formartMovements(value, locale, currency) {
	return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
	}).format(value);
}

const displayMovements = function (acc, sort = false) {
	containerMovements.innerHTML = ' ';
	
	const movs = sort ? acc.movements.slice().sort((a, b) => a - b) :  acc.movements 
	movs.forEach((movement, i) => {
		const movementType = movement > 0 ? 'deposit' : 'withdrawal ';
		const date = new Date(acc.movementsDates[i]);
		const displayDate = dateformatter(date, acc.locale);
        const htmlTemplate = `
        <div class="movements__row">
                <div class="movements__type movements__type--${movementType}">${
          i + 1
        } ${movementType}</div>
								<div class="movements__date">${displayDate}</div>
                <div class="movements__value">${formartMovements(movement, acc.locale, acc.currency)}</div>
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

const calcPrintBalance = function (acc) {

	acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
    labelBalance.textContent = `${formartMovements(acc.balance, acc.locale, acc.currency)}`
}


//display the incomes 

const calcdisplaySummary = function (acc) {
	//income display
	const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, val) => acc + val, 0);
	labelSumIn.textContent = `${formartMovements(incomes, acc.locale, acc.currency)}`;

	//outcome display 
	const outcomes = Math.abs(acc.movements.filter(mov => mov < 0).reduce((acc, val) => acc + val, 0));        
	labelSumOut.textContent = `${formartMovements(outcomes, acc.locale, acc.currency)}`;

	//interest 

	const interest = acc.movements.filter(mov => mov > 0).map(mov => mov * acc.interest/100).filter(interest => interest >= 1).reduce((acc, val) => acc + val, 0);
	labelSumInterest.textContent = `${formartMovements(
    interest,
    acc.locale,
    acc.currency
  )}`;
}

const firstWithdrawl = movements.find(mov => mov < 0) // unlike the filter method that retuns a new array the find method will only return the first element that fulfills the condition

// update the UI


const updateUI = function (acc) {
	displayMovements(acc);
	calcPrintBalance(acc);
	calcdisplaySummary(acc);
}

const startTimer = function () {
	// in each call, print the remaining time to ui
	const tick = function () {
		
		let min = `${Math.trunc(startTime / 60)}`.padStart(2, 0);
		let seconds = `${startTime % 60}`.padStart(2, 0);

		// in each call, print the remaining time to UI
		labelTimer.textContent = `${min} : ${seconds}`;
		// 
		// when 0 seconds, stop timer and log out user
		
		if (startTime === 0) {
			clearInterval(tick)
			labelWelcome.textContent = `Log in to get started`
			containerApp.style.opacity = 0;
		}
		startTime--;  
	}
	
	let startTime = 100;
	tick();
	const timer = setInterval(tick, 1000)
	return timer;
}


//Even Handlers 
let currentAccount, timer;


btnLogin.addEventListener('click', (e) => {
	//Prevents form from submitting
	e.preventDefault()
	
	currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

	console.log(currentAccount);
	
	if (currentAccount?.pin === +(inputLoginPin.value)) {
		console.log(`Hello Mr.${currentAccount.owner.split(' ')[1]}, welcome to SUbsidian Bank`);
		
		// DISPLAY UI AND WELCOME MESSAGE
		labelWelcome.textContent = `Welcome back ${
			currentAccount.owner.split(' ')[0]
    }`;
		
    // CLEAR INPUT FIELDS
    inputLoginUsername.value = inputLoginPin.value = '';
		inputLoginPin.blur();
		
		if (timer) clearInterval(timer);
		timer = startTimer();
    containerApp.style.opacity = 100;
    updateUI(currentAccount);
		
		const now = new Date();
		const dateOptions = {
			hour: 'numeric',
			minute: '2-digit',
			day: 'numeric',
			month: 'long',
			year: 'numeric', 
			weekday: 'short'
		}
		const locale = navigator.language;

		labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, dateOptions).format(now);
	}
})

btnTransfer.addEventListener('click', function (e) {
	e.preventDefault();
	const amount = +(inputTransferAmount.value);
	const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
	inputTransferTo.value = inputTransferAmount.value = '';

	if (amount > 0 && receiverAcc && amount <= currentAccount.balance && receiverAcc?.username !== currentAccount.username) {
		// Doing the transfer
		currentAccount.movements.push(-amount);
		currentAccount.movementsDates.push(new Date().toISOString())
		receiverAcc.movements.push(amount);
		receiverAcc.movementsDates.push(new Date().toISOString());
		containerApp.style.opacity = 100;
		updateUI(currentAccount);
		clearInterval(timer);
    timer = startTimer();
	}
});
// requesting for a loan 
//bank rule: the bank only grants a loan if there is a deposit with at least 10% of the requested loan amount.

btnLoan.addEventListener('click', function (e) {
	e.preventDefault()
	const amount = Math.floor(inputLoanAmount.value);
	console.log(amount);

	if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {

		const loanAccepted = function() {
		currentAccount.movements.push(amount);

		//update the date section
		currentAccount.movementsDates.push(new Date().toISOString())
			updateUI(currentAccount);
			clearInterval(timer);
			timer = startTimer();
		}

		setTimeout(loanAccepted, 3000)
	}
	inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (
    inputCloseUsername.value === currentAccount.username &&
    +(inputClosePin.value) === currentAccount.pin
    ) {
    const index = accounts.findIndex(
        acc => acc.username === currentAccount.username
    );
    console.log(index);

    // delete the account
    accounts.splice(index, 1);
    console.log(accounts);

    //hide the ui
    containerApp.style.opacity = 0;

    // hide the welcome message

    labelWelcome.textContent = 'login to get started';
    }
});

//sorting 
let sorted = false;

btnSort.addEventListener('click',(e) => {
	e.preventDefault();
	displayMovements(currentAccount.movements, !sorted);
	sorted = !sorted;
})

const movementsUi = Array.from(document.querySelectorAll('.movements__value'));

console.log(movementsUi);

labelBalance.addEventListener('click', () => {
	const movementsUI = Array.from(document.querySelectorAll('.movements__value'), (el) => el.textContent.replace('$', ''));

	const total = movementsUI.map(el => +(el)).reduce((cur, i) => cur + i);

	console.log(total)
})

const newOwner = 'david 0uma';

console.log(newOwner.split(' ').map(name => name.split('')));


labelBalance.addEventListener('click', () => {
	const xArr = Array.from(document.querySelectorAll('.movements__row'), (row, i) => {
		if (i % 2 === 0) row.style.backgroundColor = 'blue'; 
	})
})

console.log(new Date(account1.movementsDates[0]));

const myName = 'David Ouma';

console.log(myName.split(' ').map(name => name[0]).join(''))