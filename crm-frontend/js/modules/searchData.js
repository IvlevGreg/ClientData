import { createTable } from './createTable.js';

export function searchData(
  data,
  searchInput,
  tableFoot,
  listenApproveDeleteModal
) {
  const searchData = data.slice();
  const searchValue = searchInput.value.toLowerCase().trim();

  setTimeout(() => {
    for (let i = 0; i < searchData.length; i) {
      const propertyArray = ['id', 'name', 'surname', 'lastName'];
      const e = searchData[i];

      //функция проверки на совподение текста запроса и данных клиента
      function isInclude(arrayIndex) {
        const clientsValue = e[propertyArray[arrayIndex]].toLowerCase();
        return clientsValue.includes(searchValue);
      }
      if (isInclude(0) || isInclude(1) || isInclude(2) || isInclude(3)) {
        i++;
      } else {
        searchData.splice(i, 1);
      }
    }
    if (searchData.length === 0 && searchValue.length > 0) {
      tableFoot.classList.add('table__foot_error');
      document.getElementById(
        'table-text-error'
      ).textContent = `Упс! По вашемо запросу: "${searchInput.value}" совпадений не найдено`;
    } else {
      tableFoot.classList.remove('table__foot_error');
    }
    createTable(searchData, listenApproveDeleteModal);
    console.log(searchData);
    console.log(searchInput.value);
    return searchData;
  }, 300);
}
