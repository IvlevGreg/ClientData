import { createTableRow } from './create-elements.js';
import { listenButtons } from './listenButtons.js';
import { visibilityContact } from './visibilityContact.js';

const modalData = document.getElementById('modal-data');
const modalDataActiveClass = 'modal-data--active';

export function createTable(array, listenApproveDeleteModal) {
  let tableBody = document.getElementById('table-body');
  if (tableBody) tableBody.remove();

  tableBody = document.createElement('tbody');
  tableBody.classList.add('table__body');
  tableBody.id = 'table-body';
  table.append(tableBody);

  array.forEach((client) => {
    const row = createTableRow(tableBody, client);
    listenButtons(
      client,
      row,
      modalData,
      modalDataActiveClass,
      listenApproveDeleteModal
    );
  });
  visibilityContact(tableBody);
}
