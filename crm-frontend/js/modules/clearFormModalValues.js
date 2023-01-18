import { clearErrorList } from './clearErrorList.js';
import { fillModifyForm } from './fillModifyForm.js';

export function clearFormModalValues(
  formModal,
  modalData,
  listenApproveDeleteModal
) {
  clearErrorList();
  const emptyObj = {
    id: '',
    name: '',
    surname: '',
    lastName: '',
    contacts: [],
  };
  document
    .querySelectorAll('.form-modal__add-contact')
    .forEach((li) => li.remove());
  fillModifyForm(emptyObj, formModal, modalData, listenApproveDeleteModal);
}
