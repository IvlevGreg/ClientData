import { clearErrorList } from './clearErrorList.js';
import { clearFormModalValues } from './clearFormModalValues.js';

const modalDataActiveClass = 'modal-data--active';

export function closeModalData(formModal, modalData, listenApproveDeleteModal) {
  modalData.classList.remove(
    modalDataActiveClass,
    'modal-data_add',
    'modal-data_modify'
  );
  clearFormModalValues(formModal, modalData, listenApproveDeleteModal);
  clearErrorList();
}
