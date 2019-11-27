'use strict';

// function DomElement(selector, height, width, bg, fontSize) {
//    this.selector = selector;
//    this.height = height; 
//    this.width = width; 
//    this.bg = bg;
//    this.fontSize = fontSize ;
// }

// DomElement.prototype.element = function() {
//     const  elem = document.createElement(`${(this.selector[0] === '.' && 'div') || 'p'}`);
//     elem.classList.add(this.selector.slice(1));
//     document.body.appendChild(elem);
//     elem.style.cssText = `
//       height: ${this.height}px;
//       width: ${this.width}px;
//       background-color: ${this.bg};
//       font-size: ${this.fontSize}px;
//     `;
//     elem.innerHTML = '10 урок';
//   };
// const domElement = new DomElement('#hello', 100, 100, 'red', 25);
// domElement.element();

// AppData.prototype.getAddExpenses = function() {
//   let addExpenses = additionalExpensesItem.value.split(',');
//   addExpenses.forEach(item => {
//     item = item.trim();
//     return item !== '' && this.addExpenses.push(item);
//   });
// };

// AppData.prototype.getAddIncome = function()  {
//   additionalIncomeItem.forEach(item => {
//     let itemValue = item.value.trim();
//     return item.value !== '' && this.addIncome.push(itemValue);
//   });
// };

// AppData.prototype.getExpInc = function() {
//   const addExpenses = additionalExpensesItem.value.split(',');
//   addExpenses.forEach(item => item !== '' && this.addExpenses.push(item.trim()));
//   additionalIncomeItem.forEach(item => item.value !== '' && this.addIncome.push(item.value.trim()));
// };


AppData.prototype.addExpensesBlock = function() {  // после нажатия + добавляет блок с инпутами обязательные расходы
  
  let cloneExpensesItems = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItems, plusExpenses);
  expensesItems = qsAll('.expenses-items');

  if(expensesItems.length === 3) {
    plusExpenses.style.display = 'none';
  }
};

AppData.prototype.addIncomeBlock = function() {
  let cloneIncomeItems = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItems, plusIncome);
  incomeItems = qsAll('.income-items');
  if(incomeItems.length === 3) {
    plusIncome.style.display = 'none';
  }
};


AppData.prototype.addExpIncBlock = function(item, plus) {
  let clone = item[0].cloneNode(true);
  item[0].parentNode.insertBefore(clone, plus);
  if(item === qsAll('.expenses-items')){
    item = qsAll('.expenses-items');
  } else {
    item = qsAll('.income-items');
  }
  if(clone.length === 3) {
    plus.style.display = 'none';
  }
};


AppData.prototype.getExpInc = function() {
  const count = item => {
    const startStr = item.className.split('-')[0];
    const itemTitle = qs(`.${startStr}-title`).value;
    const itemAmount = qs(`.${startStr}-amount`).value;
    if (itemTitle !== '' && itemAmount !== '' ) {
      this[startStr][itemTitle] = itemAmount;
    }
  };
  incomeItems.forEach(count);
  expensesItems.forEach(count);

  for (const key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};




