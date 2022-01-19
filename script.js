const transactionsUL = document.querySelector("#transactions")
const incomeDisplay = document.querySelector("#money-plus")
const expenseDisplay = document.querySelector("#money-minus")
const balanceDisplay = document.querySelector("#balance")
const form = document.querySelector("#form")
const inputTransactionsName = document.querySelector("#text")
const inputTransactionsAmount = document.querySelector("#amount")


const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"))
let transactions = localStorage.
getItem("transactions") !== null ? localStorageTransactions : []

const RemoveTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    UpdateLocalStorage()
    init()
}

const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? "-" : "+"
    const CSSClass = transaction.amount < 0 ? "minus" : "plus"
    const amountWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement("li")


    li.classList.add(CSSClass)
    li.innerHTML = ` ${transaction.name} 
    <span> ${operator} R$ ${amountWithoutOperator} </span> 
    <button class="delete-btn" Onclick="RemoveTransaction(${transaction.id})"> 
    X </button> `

    transactionsUL.append(li)

}

const updateBalanceValues = () => {
    const transactionAmounts = transactions
        .map(transaction => transaction.amount)
    const total = transactionAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)
    const income = transactionAmounts.filter(value => value > 0)
        .reduce((accumulator, value) => accumulator + value, 0).toFixed(2)
    const expense = Math.abs(transactionAmounts.filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0)).toFixed(2)

    balanceDisplay.textContent = ` R$ ${total}`
    incomeDisplay.textContent = ` R$ ${income}`
    expenseDisplay.textContent = ` R$ ${expense} `
}

const init = () => {
    transactionsUL.innerHTML = ""
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

const UpdateLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener("submit", event => {
    event.preventDefault()

    const transactionName = inputTransactionsName.value.trim()
    const transactionAmounts = inputTransactionsAmount.value.trim()


    if (transactionName === "" || transactionAmounts === "") {
        alert("Por Favor, Preencha todos os campos")
        return
    }
    const transactionss = {
        id: generateID(),
        name: transactionName,
        amount: Number(transactionAmounts)
    }

    transactions.push(transactionss)
    init()
    UpdateLocalStorage()

    inputTransactionsName.value = ""
    inputTransactionsAmount.value = ""
})