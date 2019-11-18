'use strict';
const qs = document.querySelector.bind(document);
const qsAll = document.querySelectorAll.bind(document);

let allInput = qsAll('input');
        //Левая сторона программы
        let data = qs('.data');
let salaryAmount = qs('.salary-amount'),  //Месячный доход
    incomeItems = qsAll('.income-items'),
    incomeTitle = qs('input.income-title'),   //Наименование дополнительного дохода
    incomeAmount = qs('.income-amount'),  //сумма дополнительного дохода
    additionalIncomeItem = qsAll('.additional_income-item'), //поля для ввода возможных доходов
    expensesTitle = qs('input.expenses-title'),  //Обязательные расходы наименование
    expensesAmount = qs('.expenses-amount'),  ////Обязательные расходы сумма
    additionalExpensesItem = qs('.additional_expenses-item'), //Возможные расходы
    periodSelect = qs('.period-select'), //Период расчета
    start = document.getElementById('start'), //кнопка рассчитать
    cancel = document.getElementById('cancel'),
    plusIncome = data.getElementsByTagName('button')[0], // первая кнопка +
    plusExpenses = data.getElementsByTagName('button')[1], // вторая кнопка +
    checkbox = qs('#deposit-check'),  // чекбокс депозит
    expensesItems = qsAll('.expenses-items'),  // блок с инпутами обязательных расходов
    targetAmount = qs('.target-amount'),
    periodAmount = qs('.period-amount');
        //Правая сторона программы, результаты
        let result = qs('.result'),
        budgetMonthValue = qs('.budget_month-value'), // доход за месяц
        budgetDayValue = qs('.budget_day-value'), // Дневной бюджет
        expensesMonthValue = qs('.expenses_month-value'), // Расход за месяц
        additionalIncomeValue = qs('.additional_income-value'), // Возможные доходы
        additionalExpensesValue = qs('.additional_expenses-value'), // Возможные расходы
        incomePeriodValue = qs('.income_period-value'), // Накопления за период
        targetMonthValue = qs('.target_month-value'); // Срок достижения цели в месяцах

start.disabled = false;

function AppData() {
  this.budget = 0;        //наш доход
  this.income = {};         //дополниетльный доход
  this.incomeMonth = 0;    //дополнительный месячный доход 
  this.addIncome = [];
  this.expenses = {};       // наши расходы
  this.addExpenses = [];    // дополнительные расходы
  this.deposit = false; 
  this.percentDeposit = 0; //процент под который положили депозит
  this.moneyDeposit = 0;   //колличество денег, которые положили на депозит
  this.budgetDay = 0;    //количество денег на день с учетом расходов
  this.budgetMonth = 0;  //месячный запас денег с учетом расходов
  this.expensesMonth = 0;   //затраты за месяц
}



AppData.prototype.start = function() {
  if (salaryAmount.value === '') {
    return;
  }
  this.budget = +salaryAmount.value;
  
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getIncomeMonth();
  this.getAddExpenses();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
  this.blocked();
};

AppData.prototype.showResult = function()  {
  console.log(budgetMonthValue.value);   // выводит результат на экран в инпуты после нажатия кнопки расчитать
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcSavedMoney();
  periodSelect.addEventListener('input', () => {
    incomePeriodValue.value = this.calcSavedMoney();
  });

};
AppData.prototype.blocked = function() {
  let input = qsAll('.data input');
   input.forEach(function(item){
     if(item.className !== "period-select"){
     item.disabled = true;
   }
   });
   start.style.display = 'none';
   cancel.style.display = 'block';
 };

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

AppData.prototype.getExpenses = function() {
  expensesItems.forEach(item => {
    let itemExpenses = item.querySelector('.expenses-title').value;
    let cashExpenses = +item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== ''){
      this.expenses[itemExpenses] = cashExpenses;
    }
    
  });
};
AppData.prototype.getIncome = function() {
  incomeItems.forEach(item => {
    let itemIncome = item.querySelector('input.income-title').value;
    let cashIncome = +item.querySelector('input.income-amount').value;
    if(itemIncome !== '' && cashIncome !== ''){
      this.income[itemIncome] = cashIncome;
    }
  });
};

AppData.prototype.getAddExpenses = function() {
  let addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(item => {
    item = item.trim();
    if (item !== ''){
      this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function()  {
  additionalIncomeItem.forEach(item => {
    let itemValue = item.value.trim();
    if(item.value !== ''){
      this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getExpensesMonth = function() {   //Функция возвращает сумму всех расходов за месяц
  for (let key in this.expenses) {
    console.log(this.expenses[key]);
     this.expensesMonth += this.expenses[key];
    
  }
  
};
AppData.prototype.getIncomeMonth = function() {
  for(let key in this.income) {
    this.incomeMonth += this.income[key];
  }
};

AppData.prototype.getBudget = function() {
  console.log(this.budget, this.incomeMonth, this.expensesMonth);     
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth ; //месячный доход с учетом обязательных расходов
  this.budgetDay = Math.ceil(this.budgetMonth / 30);   //дневной бюджет с учетом обязательных расходов
};

AppData.prototype.getTargetMonth = function() { //Функция подсчитывает за какой период будет достигнута цель
 return targetAmount.value / this.budgetMonth;
};    
   


AppData.prototype.calcSavedMoney = function() {
return this.budgetMonth * periodSelect.value;
};
    
AppData.prototype.upperCase =  () => {  //делает в массиве первые буквы Заглавными
for( let i = 0; i < this.addExpenses.length; i++){
  this.addExpenses[i] = this.addExpenses[i].trim();
  this.addExpenses[i] = this.addExpenses[i][0].toUpperCase() + this.addExpenses[i].toLowerCase().slice(1);
  console.log(this.addExpenses[i]);
}

};

AppData.prototype.EventListener = function() {
  start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', () => { 
  start.style.display = 'block';
  cancel.style.display = 'none';
  let allInput = qsAll('input');
  allInput.forEach(input => {
  input.disabled = false;
  input.value = '';
  periodSelect.value = 1;
  qs('.period-amount').textContent = periodSelect.value;
  });
});

plusExpenses.addEventListener('click', appData.addExpensesBlock);
plusIncome.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function(){
  qs('.period-amount').textContent = periodSelect.value;
});
 };


 const appData = new AppData();
 appData.EventListener();
            //Обработчики событий







