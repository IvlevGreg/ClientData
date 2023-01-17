export function getFormModalValues(clientId) {
  const formModalInput = document.querySelectorAll('.form-modal__input');
  const obj = {};
  const contactsArray = [];
  formModalInput.forEach((el) => {
    if (clientId.textContent) obj['id'] = clientId.textContent;
    if (el.name === 'contacts') {
      contactsArray.push({
        type: el.getAttribute('data-contact'),
        value: el.value,
      });
      obj['contacts'] = contactsArray;
    } else {
      obj[el.name] = el.value;
    }
  });
  return obj;
}
