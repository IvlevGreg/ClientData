export function visibilityContact(tableBody) {
  const contactsList = Array.from(
    tableBody.querySelectorAll('.table__contacts-list')
  );
  contactsList.forEach((contacts) => {
    const hideValue = 4;
    if (contacts.childNodes.length > hideValue) {
      // contacts.classList.add('table__col_contacts-hide')

      const li = document.createElement('li');
      li.classList.add('table__contact-hide-amount');

      const btn = document.createElement('button');
      btn.classList.add('table__contact-hide-btn');
      btn.classList.add('tooltip');
      btn.classList.add('btn');
      btn.textContent = `+${contacts.childNodes.length - hideValue}`;

      const div = document.createElement('div');
      div.classList.add('tooltip__text');
      div.textContent = 'Показать всё';

      btn.append(div);
      li.append(btn);
      contacts.append(li);

      btn.addEventListener('click', () => {
        li.remove();
        contacts.classList.add('table__col_show-all');
      });
    }
  });
}
