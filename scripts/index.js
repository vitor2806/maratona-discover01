const exitButton = document.querySelector('#exit')
const saveButton = document.querySelector('#save')
const newItemButton = document.querySelector('.new-item')
const modalWindow = document.querySelector('.modal-background')
const body = document.querySelector('body')

const Utils = { 
    //get the date on form format then formats it to dd/mm/yy
    formatDate(date) {
        const splitDate = date.split('-')
        return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
    }
}
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
        document.querySelector('tbody').innerHTML += `
        <tr>
            <td class="description">${desc}</td>
            <td class="outcome">${amount}</td>
            <td class="date" >${date}</td>
            <td><img src="./assets/minus.svg" alt="remover transação"></td>
        </tr>      
        `
    }
}

//functions related to convert, format etc


saveButton.addEventListener('click', () => {
    console.log(Modal.addItem())
})
newItemButton.addEventListener('click', Modal.viewModal)
exitButton.addEventListener('click', Modal.viewModal)