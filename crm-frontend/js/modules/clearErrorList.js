const saveErrorClass = '.form-modal__save-error';
const saveErrorList = document.querySelector(saveErrorClass);

export function clearErrorList() {
  Array.from(saveErrorList.childNodes).forEach((e) => e.remove());
}
