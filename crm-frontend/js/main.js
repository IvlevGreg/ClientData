import { visibilityContact } from './modules/visibilityContact.js';
import { sortData } from './modules/sortData.js';
import { searchData } from './modules/searchData.js';
import { createTable } from './modules/createTable.js';
import { clearErrorList } from './modules/clearErrorList.js';
import { clearFormModalValues } from './modules/clearFormModalValues.js';
import { closeModalData } from './modules/closeModalData.js';
import { formValidation } from './modules/formValidation.js';
import { getFormModalValues } from './modules/getFormModalValues.js';

//Глобальные переменные
let tableBody = document.getElementById('table-body');
const tableFoot = document.getElementById('table-foot');
const searchInput = document.getElementById('search-input');
const table = document.getElementById('table');
const modalData = document.getElementById('modal-data');
const modalDataActiveClass = 'modal-data--active';
const modalDataDelete = document.getElementById('modal-data-delete');
const formModal = document.getElementById('form-modal');
const btnAdd = document.getElementById('add-btn');
const btnCancel = document.getElementById('cancel-btn');
const btnModalAddClose = document.getElementById('modal-data-close');
const btnModalDeleteClose = document.getElementById('modal-data-close-delete');
const btnCancelDelete = document.getElementById('cancel-btn-delete');
const btnApproveDelete = document.getElementById('approve-btn-delete');
const clientId = document.getElementById('client-id');
const saveErrorClass = '.form-modal__save-error';
const saveErrorClassActive = 'form-modal__save-error--active';
const saveErrorList = document.querySelector(saveErrorClass);

searchInput.focus();

async function postClientsData(obj) {
  saveErrorList.classList.remove(saveErrorClassActive);
  try {
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      body: JSON.stringify(obj),
    });
    const data = await response.json();
    if (data.errors) {
      saveErrorList.textContent = 'Ошибка:';
      data.errors.forEach((error) => {
        saveErrorList.classList.add(saveErrorClassActive);
        const li = document.createElement('li');
        li.textContent = error.message;
        saveErrorList.append(li);
      });
    } else {
      processingPromice();
    }
    return data;
  } catch (error) {
    saveErrorList.classList.add(saveErrorClassActive);
    if (error) saveErrorList.textContent = error;
  }
}

async function pathClientData(obj) {
  const errorMessage = document.querySelector(saveErrorClass);
  errorMessage.classList.remove(saveErrorClassActive);

  try {
    const response = await fetch(
      `http://localhost:3000/api/clients/${obj.id}`,
      {
        method: 'PATCH',
        body: JSON.stringify(obj),
      }
    );
    const data = await response.json();
    if (data.errors) {
      errorMessage.textContent = 'Ошибка:';
      data.errors.forEach((error) => {
        errorMessage.classList.add(saveErrorClassActive);
        const li = document.createElement('li');
        li.textContent = error.message;
        errorMessage.append(li);
      });
    } else {
      processingPromice();
    }
    return data;
  } catch (error) {
    errorMessage.classList.add(saveErrorClassActive);
    if (error) errorMessage.textContent = error;
  }
}

async function getClientsData() {
  const response = await fetch('http://localhost:3000/api/clients');
  const data = await response.json();
  return data;
}
tableFoot.classList.add('table__foot_loading');

function processingPromice() {
  getClientsData().then(
    (clientsArray) => {
      tableFoot.classList.remove('table__foot_loading');

      searchData(
        clientsArray,
        searchInput,
        tableFoot,
        listenApproveDeleteModal
      );

      function listenApproveDeleteModal(obj) {
        // Открытие модалки
        modalDataDelete.classList.add(modalDataActiveClass);
        let isOpen = true;

        modalDataDelete.addEventListener('click', (e) => {
          if (e.target === modalDataDelete) {
            closeModalDataDelete();

            isOpen = false;
          }
        });

        btnCancelDelete.addEventListener('click', () => {
          closeModalDataDelete();
          isOpen = false;
        });

        btnModalDeleteClose.addEventListener('click', () => {
          closeModalDataDelete();
          isOpen = false;
        });

        btnApproveDelete.addEventListener('click', () => {
          if (!obj.id) return;
          if (isOpen) {
            const response = fetch(
              `http://localhost:3000/api/clients/${obj.id}`,
              {
                method: 'DELETE',
              }
            );
            response.then(
              (result) => {
                closeModalDataDelete();
                processingPromice();
              },
              (error) => {
                console.log(error);
                const errorContainerDeleteModal = document.getElementById(
                  'error-container-delete'
                );
                errorContainerDeleteModal.classList.add(saveErrorClassActive);
                if (error) errorContainerDeleteModal.textContent = error;
              }
            );
          }
        });
      }

      function formModalListener() {
        formModal.addEventListener('submit', (e) => {
          e.preventDefault();
          const obj = getFormModalValues(clientId);

          if (formValidation(obj, saveErrorList, saveErrorClassActive)) {
            if (modalData.getAttribute('data-modal') === 'modify') {
              pathClientData(obj);
            }
            if (modalData.getAttribute('data-modal') === 'add') {
              postClientsData(obj);
            }
            // processingPromice();

            closeModalData(formModal, modalData, listenApproveDeleteModal);
          }
        });
      }
      formModalListener();

      // функционал скрытия кнопки удаления контакта
      //решил не включать в итог
      function showDeleteContactButtun() {
        const formModalInputContact = document.querySelectorAll(
          '.form-modal__input_contact'
        );

        formModalInputContact.forEach((e) => {
          e.addEventListener('input', () => {
            parent = e.parentElement;
            const deleteButton = parent.querySelector(
              '.form-modal__delete-contact'
            );

            if (e.value) {
              deleteButton.classList.add('form-modal__delete-contact--active');
            } else {
              deleteButton.classList.remove(
                'form-modal__delete-contact--active'
              );
            }
          });
        });
      }
      // showDeleteContactButtun()

      //Слушаем кнопки сортировки
      const sortButtons = document.querySelectorAll('.js-sort-btn');
      let sortOrder = false;
      sortButtons.forEach((button) => {
        button.addEventListener('click', () => {
          sortButtons.forEach((button) => {
            button.classList.remove('table__btn--active');
          });
          sortOrder = !sortOrder;
          button.classList.toggle('table__btn--rotate', !sortOrder);
          button.classList.toggle('table__btn--active');

          searchData(
            clientsArray,
            searchInput,
            tableFoot,
            listenApproveDeleteModal
          );
          sortData(clientsArray, button.getAttribute('data-sort'), sortOrder);
          searchData(
            clientsArray,
            searchInput,
            tableFoot,
            listenApproveDeleteModal
          );
          visibilityContact(tableBody);
        });
      });

      searchInput.addEventListener('input', () => {
        searchData(
          clientsArray,
          searchInput,
          tableFoot,
          listenApproveDeleteModal
        );
      });
      saveErrorClass;
      btnAdd.addEventListener('click', (e) => {
        clearErrorList();
        modalData.classList.add(modalDataActiveClass, 'modal-data_add');
        modalData.setAttribute('data-modal', 'add');
        clearFormModalValues(formModal, modalData, listenApproveDeleteModal);
      });

      btnCancel.addEventListener('click', () => {
        closeModalData(formModal, modalData, listenApproveDeleteModal);
      });

      btnModalAddClose.addEventListener('click', () => {
        closeModalData(formModal, modalData, listenApproveDeleteModal);
      });

      modalData.addEventListener('click', (e) => {
        if (e.target === modalData) {
          closeModalData(formModal, modalData, listenApproveDeleteModal);
        }
      });

      function closeModalDataDelete() {
        modalDataDelete.classList.remove(modalDataActiveClass);
      }

      visibilityContact(tableBody);
    },
    (error) => {
      tableFoot.classList.remove('table__foot_loading');
      tableFoot.classList.add('table__foot_error');
      document.getElementById(
        'table-text-error'
      ).textContent = `Упс! Ошибка сервера: ${error}`;
    }
  );
}
processingPromice();
