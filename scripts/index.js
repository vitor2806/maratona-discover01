const exitButton = document.querySelector('#exit')
const saveButton = document.querySelector('#save')
const newItemButton = document.querySelector('.new-item')
const modalWindow = document.querySelector('.modal-background')
const body = document.querySelector('body')

//functions related to modal window
const Modal = {
    //controls Modal window visibility
    viewModal() {
        modalWindow.classList.toggle('active')
        body.classList.toggle('overflow-hidden')
    },

    //get modal form values then return in object
    getFormValues() {
        const desc = document.querySelector('#transaction-desc').value
        const amount = document.querySelector('#transaction').value
        const date = Utils.formatDate(document.querySelector('#transaction-date').value)
        return {desc, amount, date}
    },
}

const transactions = [
    {
        description: 'Salario',
        amount: 200000,
        date: '23/10/2021'
    },
    {
        description: 'Website',
        amount: 500000,
        date: '23/10/2021'
    },
    {
        description: 'Gás',
        amount: -20000,
        date: '23/10/2021'
    },
]

//functions related to transaction
const Transaction = {
    //gets all transactions then store into all attribute
    all: transactions,

    //gets a transaction then pushes it into all attribute then do a application refresh
    add(transaction) {
        this.all.push(transaction)
        App.refresh()
    },

    //gets an index then removes row assigned to it
    remove(index) {
        Transaction.all.splice(index, 1)
        App.refresh()
    }
}

//functions related to transactions calc
const Calculator = {
    //Sum all transaction amounts that are bigger than 0
    incomes() {
        let income = 0
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount
            }
        })
        return income
    },

    //Sum all transaction amounts that are less than 0
    out() {
        let out = 0
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                out += transaction.amount
            }
        })
        return out
    },

    //Sum incomes and out
    total() {
        let total = 0
        total = this.incomes() + this.out()
        return total
    }
}

//functions related to balance card
const Balance = {
    //update card values
    updateBalance() {
        document.getElementById('profit').innerHTML = Utils.formatCurrency(Calculator.incomes())
        document.getElementById('loss').innerHTML = Utils.formatCurrency(Calculator.out())
        document.getElementById('total-money').innerHTML = Utils.formatCurrency(Calculator.total())
    }
}

//functions related to table element
const Table = {
    //selects tablebody and stores in tableBody attribute
    tableBody: document.querySelector('tbody'),

    //create a table row then calls generateHTML for table row content then appends it to the tableBody attribute
    addItem(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = this.generateHTML(transaction)
        this.tableBody.appendChild(tr)
    },

    //store row formart as HTML then return it
    generateHTML(transaction) {
        const amount = Utils.formatCurrency(transaction.amount)
        const transType = Utils.knowTransType(transaction.amount)

        const rowContent = `
            <td class="description">${transaction.description}</td>
            <td class="${transType}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="./assets/minus.svg" alt="remover transação"></td>    
        `
        return rowContent
    },

    clearTable() {
        this.tableBody.innerHTML = ""
    },
}

//functions related to convert, format etc
const Utils = { 
    //get the date on form format then formats it to dd/mm/yy
    formatDate(date) {
        const splitDate = date.split('-')
        return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
    },

    //removes any comma or dot from money string then multiplies it by 100, example: 100,00 turns into 10000
    formatAmount(money) {
        money = (money.replace(/\.\,/g, "") * 100)
        return money
    },

    //converts 10000 into 100,00, format currency into BRL and adds signal for transaction type
    formatCurrency(money) {
        const signal = money > 0 ? "+ " : "- "
        money = String(money).replace(/\D/g, "")
        money = Number(money)/100

        money = money.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + money
    },

    //identifies which css class should be used to transition type based on money amount
    knowTransType(money) {
        const transType = money > 0 ? "income" : "out" 
        return transType
    },
}

//functions related to app initialization
const App = {
    //initialize application
    init() {
        Transaction.all.forEach((transaction) => {
            Table.addItem(transaction)
        })

        Balance.updateBalance()
    },

    //refreshes application
    refresh() {
        Table.clearTable()
        App.init()
    },
}

App.init()

Transaction.remove(0)

newItemButton.addEventListener('click', Modal.viewModal)
exitButton.addEventListener('click', Modal.viewModal)