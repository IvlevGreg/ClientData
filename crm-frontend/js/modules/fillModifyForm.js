import { clearErrorList } from './clearErrorList.js';
import { closeModalData } from './closeModalData.js';
import createContact from './create-contact.js';

const saveErrorClass = '.form-modal__save-error';
const saveErrorClassActive = 'form-modal__save-error--active';
const clientId = document.getElementById('client-id');

export function fillModifyForm(
  obj,
  formModal,
  modalData,
  listenApproveDeleteModal
) {
  clearErrorList();
  document.getElementById('add-contact-btn').disabled = false;
  for (let i = 0; i < obj.contacts.length; i++) {
    const contact = createContact();
    contact.selectCurrentButton.setAttribute(
      'data-value',
      obj.contacts[i].type
    );
    contact.selectCurrentButton.textContent = obj.contacts[i].type;
    contact.contactInput.value = obj.contacts[i].value;
    contact.contactInput.setAttribute('data-contact', obj.contacts[i].type);
  }
  if (obj.contacts.length > 9) {
    document.getElementById('add-contact-btn').disabled = true;
  }
  clientId.textContent = obj.id;
  const inputNames = ['name', 'surname', 'lastName'];
  inputNames.forEach((inputName) => {
    formModal.querySelector(`input[name="${inputName}"]`).value =
      obj[inputName];
  });

  formModal.querySelector('input').focus();

  document.getElementById('btn-client-delete').addEventListener('click', () => {
    listenApproveDeleteModal(obj);
    closeModalData(formModal, modalData, listenApproveDeleteModal);
  });
}
