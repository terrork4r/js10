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

let appData = {
  budget: 0,        //наш доход
  income: {},         //дополниетльный доход
  incomeMonth: 0,    //дополнительный месячный доход 
  addIncome: [],
  expenses: {},       // наши расходы
  addExpenses: [],    // дополнительные расходы
  deposit: false, 
  percentDeposit: 0, //процент под который положили депозит
  moneyDeposit: 0,   //колличество денег, которые положили на депозит
  budgetDay: 0,    //количество денег на день с учетом расходов
  budgetMonth: 0,  //месячный запас денег с учетом расходов
  expensesMonth: 0,   //затраты за месяц

  start() {
    console.log(this);
    if (salaryAmount.value === '') {
      return;
    }
    this.budget = +salaryAmount.value;
    
    this.getExpenses.call(this);
    this.getIncome.call(this);
    this.getExpensesMonth.call(this);
    this.getIncomeMonth.call(this);
    this.getAddExpenses.call(this);
    this.getAddIncome.call(this);
    
    this.getBudget.call(this);
    this.showResult.call(this);
    this.blocked.call(this);
  },

  showResult()  {   // выводит результат на экран в инпуты после нажатия кнопки расчитать
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

  },
  blocked() {
    let input = qsAll('.data input');
     input.forEach(function(item){
       if(item.className !== "period-select"){
       item.disabled = true;
     }
     });
     start.style.display = 'none';
     cancel.style.display = 'block';
   },

  addExpensesBlock() {  // после нажатия + добавляет блок с инпутами обязательные расходы
    
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, plusExpenses);
    expensesItems = qsAll('.expenses-items');

    if(expensesItems.length === 3) {
      plusExpenses.style.display = 'none';
    }
  },

  addIncomeBlock() {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, plusIncome);
    incomeItems = qsAll('.income-items');
    if(incomeItems.length === 3) {
      plusIncome.style.display = 'none';
    }
  },
  
  getExpenses() {
    expensesItems.forEach(item => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        this.expenses[itemExpenses] = cashExpenses;
      }
      
    });
  },
  getIncome() {
    incomeItems.forEach(item => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        this.income[itemIncome] = cashIncome;
      }
    });
  },

  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item => {
      item = item.trim();
      if (item !== ''){
        this.addExpenses.push(item);
      }
    });
  },

  getAddIncome()  {
    additionalIncomeItem.forEach(item => {
      let itemValue = item.value.trim();
      if(item.value !== ''){
        this.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth() {   //Функция возвращает сумму всех расходов за месяц
    for (let key in this.expenses) {
       this.expensesMonth += +this.expenses[key];
      
    }
    
  },
  getIncomeMonth() {
    for(let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },

  getBudget() {     
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth ; //месячный доход с учетом обязательных расходов
    this.budgetDay = Math.ceil(this.budgetMonth / 30);   //дневной бюджет с учетом обязательных расходов
  },

  getTargetMonth() { //Функция подсчитывает за какой период будет достигнута цель
   return targetAmount.value / this.budgetMonth;
  },    
     
  

calcSavedMoney() {
  return this.budgetMonth * periodSelect.value;
},
      
upperCase: () => {  //делает в массиве первые буквы Заглавными
  for( let i = 0; i < this.addExpenses.length; i++){
    this.addExpenses[i] = this.addExpenses[i].trim();
    this.addExpenses[i] = this.addExpenses[i][0].toUpperCase() + this.addExpenses[i].toLowerCase().slice(1);
    console.log(this.addExpenses[i]);
  }
  console.log(this.addExpenses);
  },
  
};

            //Обработчики событий
start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', () => { 
  start.style.display = 'block';
  cancel.style.display = 'none';
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






