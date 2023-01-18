import { fillModifyForm } from './fillModifyForm.js';

const formModal = document.getElementById('form-modal');

export function listenButtons(
  client,
  row,
  modalData,
  modalDataActiveClass,
  listenApproveDeleteModal
) {
  const deleteButton = row.querySelector('.js-btn-delete');
  const modifyButton = row.querySelector('.js-btn-modify');

  deleteButton.addEventListener('click', () => {
    listenApproveDeleteModal(client);
  });

  modifyButton.addEventListener('click', async () => {
    modalData.classList.add(modalDataActiveClass, 'modal-data_modify');
    modalData.setAttribute('data-modal', 'modify');

    const response = await fetch(
      `http://localhost:3000/api/clients/${client.id}`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();
    fillModifyForm(data, formModal, modalData, listenApproveDeleteModal);
  });
}
