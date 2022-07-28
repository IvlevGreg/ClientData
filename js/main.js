import createTableRow from './create-elements.js'
import createContact from './create-contact.js'

//Глобальные переменные
let tableBody = document.getElementById('table-body')
const tableFoot = document.getElementById('table-foot')
const searchInput = document.getElementById('search-input')
const table = document.getElementById('table')
const btnAdd = document.getElementById('add-btn')
const btnCancel = document.getElementById('cancel-btn')
const modalData = document.getElementById('modal-data')
const modalDataActiveClass = 'modal-data--active'
const modalDataDelete = document.getElementById('modal-data-delete')
const btnModalAddClose = document.getElementById('modal-data-close')
const formModal = document.getElementById('form-modal')
const btnModalDeleteClose = document.getElementById('modal-data-close-delete')
const btnCancelDelete = document.getElementById('cancel-btn-delete')
const btnApproveDelete = document.getElementById('approve-btn-delete')
const clientId = document.getElementById('client-id')
const saveErrorClass = '.form-modal__save-error'
const saveErrorClassActive = 'form-modal__save-error--active'
const errorMessage = document.querySelector(saveErrorClass)
// let clientsArray = [];


async function postClientsData(obj) {
  
  errorMessage.classList.remove(saveErrorClassActive)

  try {
  
  const response = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    body: JSON.stringify(obj)
  });
  const data = await response.json();
  if(data.errors) {
    errorMessage.textContent = 'Ошибка:'
    data.errors.forEach(error => {
      errorMessage.classList.add(saveErrorClassActive)
      const li = document.createElement('li')
      li.textContent = error.message
      errorMessage.append(li)
    }) 
  }
    return data
} 
  catch (error) {
    errorMessage.classList.add(saveErrorClassActive)
    if (error) errorMessage.textContent = error
  }
}

async function pathClientData(obj) {
  const errorMessage = document.querySelector(saveErrorClass)
  errorMessage.classList.remove(saveErrorClassActive)

  try {
  
  const response = await fetch(`http://localhost:3000/api/clients/${obj.id}`, {
    method: 'PATCH',
    body: JSON.stringify(obj)
  });
  const data = await response.json();
  if(data.errors) {
    errorMessage.textContent = 'Ошибка:'
    data.errors.forEach(error => {
      errorMessage.classList.add(saveErrorClassActive)
      const li = document.createElement('li')
      li.textContent = error.message
      errorMessage.append(li)
    }) 
  }
    return data
} 
  catch (error) {
    errorMessage.classList.add(saveErrorClassActive)
    if (error) errorMessage.textContent = error
  }
}

async function getClientsData() {
  const response = await fetch('http://localhost:3000/api/clients');
    const data = await response.json();
    return data
}
tableFoot.classList.add('table__foot_loading')
getClientsData().then(

  (clientsArray) => {
    
    tableFoot.classList.remove('table__foot_loading')
    
    async function createTable(array) {
      clearTable()
      tableBody = document.createElement('tbody')
      tableBody.classList.add('table__body')
      tableBody.classList.id = 'table-body'
      table.append(tableBody)
      
    array.forEach(client => {
      const row = createTableRow(tableBody, client)
      listenButtons(client, row)
    });
  }
 createTable(clientsArray)

 function clearTable() {
  tableBody.remove()
}

function listenButtons(client, row) {
  const deleteButton = row.querySelector('.js-btn-delete');
  const modifyButton = row.querySelector('.js-btn-modify');

  deleteButton.addEventListener('click', () => {
    modalDataDelete.classList.add(modalDataActiveClass)
    
      let response;
    btnApproveDelete.addEventListener('click', () => {
      
      // try {
        const response = fetch(`http://localhost:3000/api/clients/${client.id}`,{
        method: 'DELETE'
        });
        response.then(
          result => {
            closeModalDataDelete()
          },
          error =>{
            console.log(error)
            const errorContainerDeleteModal = document.getElementById('error-container-delete')
            errorContainerDeleteModal.classList.add(saveErrorClassActive)
            if (error) errorContainerDeleteModal.textContent = error
          }
        )
    })
    })

    modifyButton.addEventListener('click', async () => {
      modalData.classList.add(modalDataActiveClass,'modal-data_modify' )
      modalData.setAttribute('data-modal', 'modify')

      // const id = row.id.textContent
      const response = await fetch(`http://localhost:3000/api/clients/${client.id}`,{
        method: 'GET'
      });
      const data = await response.json();
      fillModifyForm(data)
    })
  }

function fillModifyForm(obj) {
  document.getElementById('add-contact-btn').disabled = false
  for(let i = 0; i < obj.contacts.length; i++ ) {
    const contact = createContact()
    contact.selectCurrentButton.setAttribute('data-value', obj.contacts[i].type)
    contact.selectCurrentButton.textContent = obj.contacts[i].type
    contact.contactInput.value = obj.contacts[i].value
    contact.contactInput.setAttribute('data-contact',obj.contacts[i].type)
  }
  if (obj.contacts.length > 9) {
    document.getElementById('add-contact-btn').disabled = true
  }
  clientId.textContent = obj.id
  const inputNames = ['name', 'surname', 'lastName']
  inputNames.forEach(inputName => {
    formModal.querySelector(`input[name="${inputName}"]`).value = obj[inputName]
  })

  document.getElementById('btn-client-delete').addEventListener('click',
    () => {
      fetch(`http://localhost:3000/api/clients/${obj.id}`,{
        method: 'DELETE'
        });
    })
}

function getFormModalValues() {
  const formModalInput = document.querySelectorAll('.form-modal__input')
  const obj = {}
  const contactsArray =[]
  formModalInput.forEach(el => {
    if(clientId.textContent) obj['id'] = clientId.textContent 
    if(el.name === 'contacts') {
      contactsArray.push({
        type: el.getAttribute('data-contact'),
        value: el.value,
      })
      obj['contacts'] = contactsArray
    } else {
      obj[el.name] = el.value
    }
  })
  return obj
}

function clearFormModalValues() {
  const emptyObj = {
  id: '',
  name: '',
  surname: '',
  lastName: '',
  contacts: []
  }
  document.querySelectorAll('.form-modal__add-contact').forEach( li => li.remove()) 
  fillModifyForm(emptyObj)
}

function formModalListener() {
  formModal.addEventListener('submit', e => {
  e.preventDefault();
  const obj = getFormModalValues()
  if (formValidation(obj)) {
    if(modalData.getAttribute('data-modal') === 'modify') {
      pathClientData(obj)
    } 
    if(modalData.getAttribute('data-modal') === 'add') {
      postClientsData(obj)
    }
  }
  })
}
formModalListener()

function formValidation(obj) {
  errorMessage.classList.remove(saveErrorClassActive)
  errorMessage.textContent = 'Ошибка:'
  let errorAmount = 0;

  function createError(errorText) {
    errorMessage.classList.add(saveErrorClassActive)
    const li = document.createElement('li')
    li.textContent = errorText
    errorMessage.append(li)
  }

    if(obj.name.trim() === '') {
      createError('Не указано имя')
      errorAmount++
    }

    if(obj.surname.trim() === '') {
      createError('Не указана фамилия')
      errorAmount++
    }
    
    if(obj.contacts) {
      obj.contacts.forEach((contact) => {
        if (contact.value.trim() === '') {
          createError('Не все добавленные контакты полностью заполнены')
          errorAmount++
        }
      })
    }

    if(errorAmount === 0) {
      return true
    } else {
      return false}
}

// функционал скрытия кнопки удаления контакта 
//решил не включать т.к. тогда невозможно удалить пустой контакт
function showDeleteContactButtun() {
const formModalInputContact = document.querySelectorAll('.form-modal__input_contact')

  formModalInputContact.forEach(e => {
    e.addEventListener('input', () => {
      parent = e.parentElement
      const deleteButton = parent.querySelector('.form-modal__delete-contact')

      if(e.value){
        deleteButton.classList.add('form-modal__delete-contact--active')
      } else{
        deleteButton.classList.remove('form-modal__delete-contact--active')
      }
    })
  })
} 
// showDeleteContactButtun()

//Слушаем кнопки сортировки
const sortButtons = document.querySelectorAll('.js-sort-btn')
let sortOrder = false;
sortButtons.forEach((button) => {
  
  button.addEventListener('click', () => {
    sortButtons.forEach((button) => {
    button.classList.remove('table__btn--active')
    })
    sortOrder = !sortOrder
    button.classList.toggle('table__btn--rotate', !sortOrder)
    button.classList.toggle('table__btn--active')
    
   sortData(clientsArray, button.getAttribute('data-sort'), sortOrder)
   searchData(clientsArray)
   createTable(clientsArray)
   
  })
})


function sortData(data, property, sortOrder = 0) {
  
  data.sort((a, b) => {

    switch(property) {
      case 'id':
        return sortOrder ? a[property] - b[property] 
          : b[property] - a[property]
      break 
      
       case 'createdAt': case 'updatedAt':
        return sortOrder ? new Date(a[property]) - new Date(b[property]) 
          : new Date(b[property]) - new Date(a[property])
      break 
     
      default: 
      if (a[property] < b[property]) {return sortOrder ? -1 : 1};
      if ( a[property] > b[property]) {return sortOrder ? 1 : -1};
      return 0;
      break
    }
  })
  return data
}

function searchData(data){
  searchInput.addEventListener('input', () => {
    const searchData = data.slice();
    setTimeout(() => {
      for(let i = 0; i < searchData.length; i) {
        const propertyArray = ['id','name','surname','lastName']
        const e = searchData[i]

        //функция проверки на совподение текста запроса и данных клиента 
        function isInclude(arrayIndex) {
          const clientsValue = e[propertyArray[arrayIndex]].toLowerCase()
          const searchValue = searchInput.value.toLowerCase()
          return clientsValue.includes(searchValue)
        }
        if(isInclude(0) || isInclude(1) || isInclude(2) || isInclude(3)){
          i++
        } else {
           searchData.splice(i, 1)
        }
      }
      if(searchData.length === 0){
        tableFoot.classList.add('table__foot_error')
        document.getElementById('table-text-error').textContent = `Упс! По вашемо запросу: "${searchInput.value}" совпадений не найдено`
      } else {
        tableFoot.classList.remove('table__foot_error')
      }

      createTable(searchData)
    }, 300);
    
  })
}
searchData(clientsArray)


btnAdd.addEventListener('click', (e) => {
  modalData.classList.add(modalDataActiveClass,'modal-data_add' )
  modalData.setAttribute('data-modal', 'add')
  clearFormModalValues()
})

btnCancel.addEventListener('click', () => {
  closeModalData()
})

btnModalAddClose.addEventListener('click', () => {
  closeModalData()
})

modalData.addEventListener('click', (e) => {
    if (e.target === modalData ) {
      closeModalData()
    }
})

function closeModalData() {
  modalData.classList.remove(modalDataActiveClass,'modal-data_add', 'modal-data_modify' );
  clearFormModalValues()
}

modalDataDelete.addEventListener('click', (e) => {
  if (e.target === modalDataDelete ) {
    closeModalDataDelete()
  }
})

btnCancelDelete.addEventListener('click', () => {
  closeModalDataDelete()
})

btnModalDeleteClose.addEventListener('click', () => {
  closeModalDataDelete()
})

function closeModalDataDelete() {
  modalDataDelete.classList.remove(modalDataActiveClass);
}

function visibilityContact() {
  const contactsList = Array.from(tableBody.querySelectorAll('.table__contacts-list'))
  contactsList.forEach( (contacts) => {
    const hideValue = 4
    if(contacts.childNodes.length > hideValue) {
      // contacts.classList.add('table__col_contacts-hide')

      const li = document.createElement('li')
      li.classList.add('table__contact-hide-amount')

      const btn = document.createElement('button')
      btn.classList.add('table__contact-hide-btn')
      btn.classList.add('tooltip')
      btn.classList.add('btn')
      btn.textContent = `+${contacts.childNodes.length - hideValue}`

      const div = document.createElement('div')
      div.classList.add('tooltip__text')
      div.textContent = 'Показать всё'

      btn.append(div)
      li.append(btn)
      contacts.append(li)

      btn.addEventListener('click', () => {
        li.remove()
        contacts.classList.add('table__col_show-all')
      })
    }
  })
}
visibilityContact()

}, (error) => {
  tableFoot.classList.remove('table__foot_loading')
  tableFoot.classList.add('table__foot_error')
 document.getElementById('table-text-error').textContent = `Упс! Ошибка сервера: ${error}`
}
)