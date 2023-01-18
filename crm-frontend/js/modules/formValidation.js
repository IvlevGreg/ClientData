export function formValidation(obj, saveErrorList, saveErrorClassActive) {
  saveErrorList.classList.remove(saveErrorClassActive);
  saveErrorList.textContent = 'Ошибка:';
  let errorAmount = 0;

  function createError(errorText) {
    saveErrorList.classList.add(saveErrorClassActive);
    const li = document.createElement('li');
    li.textContent = errorText;
    saveErrorList.append(li);
  }

  if (obj.name.trim() === '') {
    createError('Не указано имя');
    errorAmount++;
  }

  if (obj.surname.trim() === '') {
    createError('Не указана фамилия');
    errorAmount++;
  }

  if (obj.contacts) {
    obj.contacts.forEach((contact) => {
      if (contact.value.trim() === '') {
        createError('Не все добавленные контакты полностью заполнены');
        errorAmount++;
      }
    });
  }

  if (errorAmount === 0) {
    return true;
  } else {
    return false;
  }
}
