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

const displayMessage = function (movements) {
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

//USING THE MAP METHODS

const userName = 'Samuel Mbure';

const createUserName = function (accs) {


    accs.forEach(acc => {
        acc.username = acc.owner.toUpperCase().split(' ').map(name => name[0]).join('');
    })
    // const initializeName = accs.toLowerCase().split(' ').map(name => name[0]).join('')

    // return initializeName.toUpperCase();

}

createUserName(accounts);
console.log(accounts);


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


createDeposits(accounts)

console.log(accounts);

//creating the withdrawal arrays

const createWithdrawals = function(accs) {

    accs.forEach(acc => acc.withdrawals = acc.movements.filter( movs => movs < 0))
}

createWithdrawals(accounts);
console.log(accounts)

//USING THE REDUCE METHOD(snowball)


const accBalance = movements.reduce((acc, currentValue) => {
    return acc + currentValue;
}, 0);

console.log(accBalance)