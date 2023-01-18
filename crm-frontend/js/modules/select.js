
function selectListener() {
document.querySelectorAll('.select').forEach(select => { 

	
	//Выбриаем все выпадающие списки на странице

	let selectCurrent = select.querySelector('.select__current'),
			selectList = select.querySelector('.select__list'),
			selectInput = select.querySelector('.select__input'),
			selectItem = select.querySelectorAll('.select__item');
			

	//по клику добавляем/удалям класс
	selectCurrent.addEventListener('click', (e) => {
		console.log('test')
		e.preventDefault()
		selectList.classList.add('select__list--show')
	})

	//обходим элементы списка
	selectItem.forEach(item =>{
	
		
		//обрабатываем событие клик по элементу
		item.addEventListener('click', (e)=>{
			e.preventDefault()
			//получаем значение из data-атрибута
			let itemValue = item.getAttribute('data-value') 
			
			//получаем содержание элемента (текст)
			let itemText = item.textContent
			
			//присваиваем инпуту ранее полученное значение из data-атрибута
			selectInput.value = itemValue 
			select.parentNode.querySelector('.form-modal__input_contact')
				.setAttribute('data-contact', itemValue ) 

			//присваиваем текущее значение (текст)
			selectCurrent.textContent = itemText 
			
			//скрываем выпадающий список
			selectListHide() 
		})
	})
	
	// функция закрытия выпадающего списка
	let selectListHide = () => {
		selectList.classList.remove('select__list--show')
	}
	//Закрываем выпадающий список, если клик был вне области
	document.addEventListener('mouseup', (e) =>{
    if (!select.contains(e.target))	selectListHide()
  })
	
})
}

export default selectListener