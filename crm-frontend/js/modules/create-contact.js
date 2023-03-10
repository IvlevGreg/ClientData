import selectListener from './select.js'

const contactList = document.getElementById('contact-list')
const addContactBtn = document.getElementById('add-contact-btn')


//классы
const classesContactItem = ['form-modal__add-contact']
const classesContactInput = ['form-modal__input', 'form-modal__input_contact']
const classesContactDeleteButton = ['btn', 'form-modal__delete-contact', 'tooltip']
const classesContactTooltipText = ['tooltip__text','tooltip__text_close' ]
const classesSelect = ['select']
const classesSelectInput = ['select__input']
const classesSelectCurrentButton = ['btn', 'select__current']
const classesSelectList = ['select__list']
const classesSelectItem = ['btn','select__item']

const contactArray = ['Телефон', 'Email', 'Facebook','VK', 'Другое']


function prepareElement( tag, classes = 0, text = 0) {
  const el = document.createElement(tag);
  if(classes) {el.classList.add(...classes)}
  if(text) {el.textContent = text}
  return el
}

addContactBtn.addEventListener('click', () => {
  
  createContact()
  selectListener()
  if (contactList.childElementCount > 9) {
    addContactBtn.disabled = true
  }
})

function createSvg(parent) {
  const linkSvg = "http://www.w3.org/2000/svg"
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const svgAttributes = new Map([['width', '14'], ['height', '14'], ['viewBox','0 0 14 14'], ['fill', 'none']])
  svgAttributes.forEach((value, attribute) => {
    svg.setAttribute(attribute, value);
  })

  const path = document.createElementNS(linkSvg, 'path');
  path.setAttribute('d', 'M7.00001 3.66665C6.63334 3.66665 6.33334 3.96665 6.33334 4.33331V6.33331H4.33334C3.96668 6.33331 3.66668 6.63331 3.66668 6.99998C3.66668 7.36665 3.96668 7.66665 4.33334 7.66665H6.33334V9.66665C6.33334 10.0333 6.63334 10.3333 7.00001 10.3333C7.36668 10.3333 7.66668 10.0333 7.66668 9.66665V7.66665H9.66668C10.0333 7.66665 10.3333 7.36665 10.3333 6.99998C10.3333 6.63331 10.0333 6.33331 9.66668 6.33331H7.66668V4.33331C7.66668 3.96665 7.36668 3.66665 7.00001 3.66665ZM7.00001 0.333313C3.32001 0.333313 0.333344 3.31998 0.333344 6.99998C0.333344 10.68 3.32001 13.6666 7.00001 13.6666C10.68 13.6666 13.6667 10.68 13.6667 6.99998C13.6667 3.31998 10.68 0.333313 7.00001 0.333313ZM7.00001 12.3333C4.06001 12.3333 1.66668 9.93998 1.66668 6.99998C1.66668 4.05998 4.06001 1.66665 7.00001 1.66665C9.94001 1.66665 12.3333 4.05998 12.3333 6.99998C12.3333 9.93998 9.94001 12.3333 7.00001 12.3333Z');
  path.setAttribute('fill', '#B0B0B0');
  svg.append(path)
  parent.append(svg)
}

function createContact() {
  const li = prepareElement('li', classesContactItem)
  const contactInput = prepareElement('input', classesContactInput)
  contactInput.name = 'contacts'
  contactInput.type = 'text'
  contactInput.placeholder = 'Введите данные контакта'
  contactInput.setAttribute('data-contact', contactArray[0] )
  const deleteBtn = prepareElement('button', classesContactDeleteButton)
  deleteBtn.type = 'button'
  deleteBtn.addEventListener('click', () => {
    li.remove()
    if (contactList.childElementCount < 10) {
      addContactBtn.disabled = false
    }
   })

   const tooltipText = prepareElement('div', classesContactTooltipText)
   tooltipText.textContent = 'Удалить контакт'
   deleteBtn.append(tooltipText)

  createSvg(deleteBtn)

  const select = prepareElement('div', classesSelect)
  const selectInput = prepareElement('input', classesSelectInput)
  selectInput.type = 'hidden'
  selectInput.name = 'select'
  const selectCurrentButton = prepareElement('button', classesSelectCurrentButton, contactArray[0])
  selectCurrentButton.type = 'button'
  selectCurrentButton.setAttribute('data-value', contactArray[0])
  const selectList = prepareElement('div', classesSelectList)
  contactArray.forEach(e => {
    const selectItem = prepareElement('button', classesSelectItem, e)
    selectItem.setAttribute('data-value', e)
    selectList.append(selectItem)
  })

  select.append(selectInput)
  select.append(selectCurrentButton)
  select.append(selectList)

  li.append(select)
  li.append(contactInput)
  li.append(deleteBtn)

  contactList.append(li)
  selectListener()
  return {
    selectCurrentButton, selectInput, contactInput
  }
}

export default createContact