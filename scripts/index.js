const exitButton = document.querySelector('#exit')
const saveButton = document.querySelector('#save')
const newItemButton = document.querySelector('.new-item')
const modalWindow = document.querySelector('.modal-background')
const body = document.querySelector('body')

newItemButton.addEventListener('click', viewModal)
exitButton.addEventListener('click', viewModal)

function viewModal() {
    modalWindow.classList.toggle('active')
}