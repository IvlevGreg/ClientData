let testObjj = {
  id: '1234567890',
  createdAt: '2021-02-03T13:07:29.554Z',
  updatedAt: '2021-12-03T00:15:09.554Z',
  name: 'Василий',
  surname: 'Пупкин',
  lastName: 'Васильевич',
  contacts: [
    {
      type: 'Телефон',
      value: '+71234567890'
    },
    {
      type: 'Email',
      value: 'abc@xyz.com'
    },
    {
      type: 'Facebook',
      value: 'https://facebook.com/vasiliy-pupkin-the-best'
    }
  ]
}

function createElement(parent, tag, classes = 0, text = 0) {
  const el = document.createElement(tag);
  if(classes) {el.classList.add(...classes)}
  if(text) {el.textContent = text}
  parent.append(el)
  return el
}

// Классы 
const classesTableRow = ['table__row']
const classesTableColumn = ['table__col']
const classesTableColumnId = ['table__col', 'table__col_text-sm', 'txt-secondary']
const classesTableDate = ['table__date']
const classesTableTime = ['table__time', 'txt-secondary']
const classesTableButtonsContainer = [ 'table__btn-container']
const classesTableButtonModify = ['btn', 'table__btn','table__btn_modify','js-btn-modify']
const classesTableButtonDelete = ['btn', 'table__btn','table__btn_delete','js-btn-delete']
const classesTableContacts = ['table__contact', 'tooltip']
const classesTableContactsList = ['table__contacts-list']
const classesTableTooltipText = ['tooltip__text']
const classesTableTooltipLink = ['tooltip__link']


function createSvgElement(parent, name) {
  let linkSvg = "http://www.w3.org/2000/svg"
  let svg = document.createElementNS(linkSvg, 'svg');
  let svgAttributes = new Map([]);
  
  function createSvgAttributes() {
    svgAttributes.forEach((value, attribute) => {
      svg.setAttribute(attribute, value);
    })
  }
  switch(name) {
    case 'Телефон': {
      svgAttributes = new Map([['width', '16'], ['height', '16'], ['viewBox','0 0 16 16'], ['fill', 'none']])
      createSvgAttributes()
      let g = document.createElementNS(linkSvg, 'g');
      svg.append(g)

      let path = document.createElementNS(linkSvg, 'path');
      path.setAttribute('d', 'M 8 0 C 3.582031 0 0 3.582031 0 8 C 0 12.417969 3.582031 16 8 16 C 12.417969 16 16 12.417969 16 8 C 16 3.582031 12.417969 0 8 0 Z M 5.125 3.175781 C 5.289062 3.167969 5.4375 3.265625 5.550781 3.441406 L 6.644531 5.515625 C 6.761719 5.761719 6.695312 6.023438 6.523438 6.199219 L 6.023438 6.699219 C 5.992188 6.742188 5.972656 6.792969 5.972656 6.84375 C 6.164062 7.585938 6.746094 8.273438 7.261719 8.746094 C 7.773438 9.21875 8.328125 9.855469 9.042969 10.007812 C 9.132812 10.03125 9.242188 10.039062 9.304688 9.980469 L 9.886719 9.390625 C 10.085938 9.238281 10.378906 9.164062 10.59375 9.289062 L 10.601562 9.289062 L 12.574219 10.453125 C 12.867188 10.632812 12.894531 10.984375 12.6875 11.199219 L 11.328125 12.546875 C 11.128906 12.753906 10.863281 12.820312 10.601562 12.824219 C 9.457031 12.789062 8.375 12.226562 7.484375 11.648438 C 6.023438 10.585938 4.683594 9.269531 3.84375 7.675781 C 3.523438 7.007812 3.144531 6.15625 3.179688 5.414062 C 3.183594 5.132812 3.257812 4.859375 3.457031 4.679688 L 4.816406 3.320312 C 4.921875 3.226562 5.027344 3.183594 5.125 3.175781 Z M 5.125 3.175781 ');
      path.setAttribute('fill', '#9873FF');
      g.append(path)
    }
      break

      case 'VK': {
      svgAttributes = new Map([['width', '16'], ['height', '16'], ['viewBox','0 0 16 16'], ['fill', 'none']])
      createSvgAttributes()
      let g = document.createElementNS(linkSvg, 'g');
      svg.append(g)

      let path = document.createElementNS(linkSvg, 'path');
      path.setAttribute('d', 'M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z');
      path.setAttribute('fill', '#9873FF');
      g.append(path)
    }
      break

      case 'Facebook': {
        svgAttributes = new Map([['width', '16'], ['height', '16'], ['viewBox','0 0 16 16'], ['fill', 'none']])
        createSvgAttributes()
        let g = document.createElementNS(linkSvg, 'g');
        svg.append(g)
  
        let path = document.createElementNS(linkSvg, 'path');
        path.setAttribute('d', 'M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z');
        path.setAttribute('fill', '#9873FF');
        g.append(path)
      }
        break

        case 'Email': {
          svgAttributes = new Map([['width', '16'], ['height', '16'], ['viewBox','0 0 16 16'], ['fill', 'none']])
          createSvgAttributes()
    
          let path = document.createElementNS(linkSvg, 'path');
          path.setAttribute('fill-rule', 'evenodd');
          path.setAttribute('clip-rule', 'evenodd');
          path.setAttribute('d', 'M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z');
          path.setAttribute('fill', '#9873FF');
          svg.append(path)
        }
          break

          case 'Другое': {
            svgAttributes = new Map([['width', '16'], ['height', '16'], ['viewBox','0 0 16 16'], ['fill', 'none']])
            createSvgAttributes()
      
            let path = document.createElementNS(linkSvg, 'path');
            path.setAttribute('fill-rule', 'evenodd');
            path.setAttribute('clip-rule', 'evenodd');
            path.setAttribute('d', 'M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z');
            path.setAttribute('fill', '#9873FF');
            svg.append(path)
          }
            break

            case 'add-client': {
              svgAttributes = new Map([['width', '23'], ['height', '16'], ['viewBox','0 0 23 16'], ['fill', 'none']])
              createSvgAttributes()
        
              let path = document.createElementNS(linkSvg, 'path');
              path.setAttribute('d', 'M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z');
              path.setAttribute('fill', '#9873FF');
              svg.append(path)
            }
              break
            
             case 'cancel': {
            svgAttributes = new Map([['width', '16'], ['height', '16'], ['viewBox','0 0 16 16'], ['fill', 'none']])
            createSvgAttributes()
      
            let gMain = document.createElementNS(linkSvg, 'g');
            svg.append(gMain)
      
            let pathMain = document.createElementNS(linkSvg, 'path');
            pathMain.classList.add('table__svg-main')
            pathMain.setAttribute('d', 'M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z');
            pathMain.setAttribute('fill', '#F06A4D');
            gMain.append(pathMain)

            let gLoad = document.createElementNS(linkSvg, 'g');
            gLoad.classList.add('table__svg-load')
            svg.append(gLoad)
      
            let pathLoad = document.createElementNS(linkSvg, 'path');
            pathLoad.setAttribute('d', 'M1.00008 6.04008C1.00008 8.82356 3.2566 11.0801 6.04008 11.0801C8.82356 11.0801 11.0801 8.82356 11.0801 6.04008C11.0801 3.2566 8.82356 1.00008 6.04008 1.00008C5.38922 1.00008 4.7672 1.12342 4.196 1.34812');
            pathLoad.setAttribute('stroke-width','2')
            pathLoad.setAttribute('stroke-miterlimit','10')
            pathLoad.setAttribute('stroke-linecap','round')
            pathLoad.setAttribute('stroke', '#F06A4D');
            gLoad.append(pathLoad)
          }
            break

             case 'edit': {
            svgAttributes = new Map([['width', '16'], ['height', '16'], ['viewBox','0 0 16 16'], ['fill', 'none']])
            createSvgAttributes()
      
            let gMain = document.createElementNS(linkSvg, 'g');
            gMain.classList.add('table__svg-main')
            svg.append(gMain)
      
            let pathMain = document.createElementNS(linkSvg, 'path');
            pathMain.setAttribute('d', 'M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z');
            pathMain.setAttribute('fill', '#9873FF');
            gMain.append(pathMain)

            let gLoad = document.createElementNS(linkSvg, 'g');
            gLoad.classList.add('table__svg-load')
            svg.append(gLoad)
      
            let pathLoad = document.createElementNS(linkSvg, 'path');
            pathLoad.setAttribute('d', 'M1.00008 6.04008C1.00008 8.82356 3.2566 11.0801 6.04008 11.0801C8.82356 11.0801 11.0801 8.82356 11.0801 6.04008C11.0801 3.2566 8.82356 1.00008 6.04008 1.00008C5.38922 1.00008 4.7672 1.12342 4.196 1.34812');
            pathLoad.setAttribute('stroke-width','2')
            pathLoad.setAttribute('stroke-miterlimit','10')
            pathLoad.setAttribute('stroke-linecap','round')
            pathLoad.setAttribute('stroke', '#9873FF');
            gLoad.append(pathLoad)
          }
            break


      default: 
      return
  }
   
  
  
  parent.append(svg)
  return svg
}



function addZeroForDates(date) {
  if (date > 9){
    return date
  } else {
    return '0' + date
  }
}

function convertDate(initialDate) {
  const date =  addZeroForDates(initialDate.getDate())
     + '.' + addZeroForDates(initialDate.getMonth() + 1)
     + '.' + initialDate.getFullYear()
  const time = addZeroForDates(initialDate.getHours()) + ':'
   + addZeroForDates(initialDate.getMinutes());

   return {
    date,
    time
   }
} 

function createTableRow(parent, obj ) {
  //преобразование данных 
  const fullName = obj.surname.trim() + ' ' + obj.name.trim() + ' ' + obj.lastName.trim();
  const createDateObj = convertDate(new Date(obj.createdAt))
  const updateDateObj = convertDate(new Date(obj.updatedAt))

  const row = createElement(parent, 'tr', classesTableRow)
  const id = createElement(row, 'td', classesTableColumnId, obj.id)
  const name = createElement(row, 'td', classesTableColumn, fullName)

  const elementCreateDate = createElement(row, 'td', classesTableColumn)
  createElement(elementCreateDate, 'time', classesTableDate, createDateObj.date).setAttribute('datetime', obj.createdAt)
  createElement(elementCreateDate, 'span', classesTableTime, createDateObj.time)
  
  const elementUpdateDate = createElement(row, 'td', classesTableColumn)
  createElement(elementUpdateDate, 'time', classesTableDate, updateDateObj.date).setAttribute('datetime', obj.updatedAt)
  createElement(elementUpdateDate, 'span', classesTableTime, updateDateObj.time)
  
  const elementContacts = createElement(row, 'td', classesTableColumn)
  const elementContactsList = createElement(elementContacts, 'ul', classesTableContactsList)
  elementContacts.classList.add('table__col_contacts')
  obj.contacts.forEach(contact => {
    let li = createElement(elementContactsList, 'li', classesTableContacts)
    li.setAttribute('tabindex', 0)
    let svg = createSvgElement(li, contact.type)
    
    let tooltip = createElement(li, 'div', classesTableTooltipText)
    tooltip.textContent = `${contact.type}: `
    createContactLink(tooltip, contact.type, classesTableTooltipLink, contact.value)
  })
  

  const elementButtons = createElement(row, 'td', classesTableColumn)
  const elementButtonsContainer = createElement(elementButtons, 'div', classesTableButtonsContainer)

  const buttonModify = createElement(elementButtonsContainer, 'button', classesTableButtonModify)  
  createSvgElement(buttonModify, 'edit')
  createElement(buttonModify, 'span', '', 'Изменить')

  const buttonDelete = createElement(elementButtonsContainer, 'button', classesTableButtonDelete)
  createSvgElement(buttonDelete, 'cancel')
  createElement(buttonDelete, 'span', '', 'Удалить')

  // const elementModify = createElement(row, 'td', classesTableColumn)
  // const buttonModify = createElement(elementModify, 'button', classesTableButtonModify)
  // createSvgElement(buttonModify, 'edit')
  // createElement(buttonModify, 'span', '', 'Изменить')

  // const elementDelete = createElement(row, 'td', classesTableColumn)
  // const buttonDelete = createElement(elementDelete, 'button', classesTableButtonDelete)
  // createSvgElement(buttonDelete, 'cancel')
  // createElement(buttonDelete, 'span', '', 'Удалить')

  return row
}


function createContactLink(parent, name, classes, value) {
  const link = document.createElement('a');
  if(classes) {link.classList.add(...classes)}
  link.textContent = value
  switch(name) {
    case 'Телефон': {
      link.setAttribute('href', `tel:${value}`)
    }
    break 

    case 'Email': {
      link.setAttribute('href', `mailto:${value}`)
    }
    break

    default: {
      link.setAttribute('href', value)
    }

  }
  parent.append(link)
}


export default createTableRow;