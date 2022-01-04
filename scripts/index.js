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

    //store getFormValues returned object into a local object then add a new row within
    addItem() {
        let { desc, amount, date } = Modal.getFormValues() 
        let transType = Utils.knowTransType(amount)
        document.querySelector('tbody').innerHTML += `
        <tr>
            <td class="description">${desc}</td>
            <td class="${transType}">${Utils.formatAmount(amount)}</td>
            <td class="date" >${date}</td>
            <td><img src="./assets/minus.svg" alt="remover transação"></td>
        </tr>      
        `
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
        return this.formatCurrency(money)
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
        money = this.formatAmount(money)
        const transType = money > 0 ? "income" : "outcome" 
        return transType
    },
}

saveButton.addEventListener('click', Modal.addItem)
newItemButton.addEventListener('click', Modal.viewModal)
exitButton.addEventListener('click', Modal.viewModal)