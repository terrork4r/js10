'use strict';

        //Левая сторона программы
        let data = document.querySelector('.data');
let salaryAmount = data.querySelector('.salary-amount'),  //Месячный доход
    incomeItems = document.querySelectorAll('.income-items'),
    incomeTitle = data.querySelector('input.income-title'),   //Наименование дополнительного дохода
    incomeAmount = data.querySelector('.income-amount'),  //сумма дополнительного дохода
    additionalIncomeItem = data.querySelectorAll('.additional_income-item'), //поля для ввода возможных доходов
    expensesTitle = data.querySelector('input.expenses-title'),  //Обязательные расходы наименование
    expensesAmount = data.querySelector('.expenses-amount'),  ////Обязательные расходы сумма
    additionalExpensesItem = data.querySelector('.additional_expenses-item'), //Возможные расходы
    periodSelect = data.querySelector('.period-select'), //Период расчета
    start = document.getElementById('start'), //кнопка рассчитать
    cancel = document.getElementById('cancel'),
    plusIncome = data.getElementsByTagName('button')[0], // первая кнопка +
    plusExpenses = data.getElementsByTagName('button')[1], // вторая кнопка +
    checkbox = data.querySelector('#deposit-check'),  // чекбокс депозит
    expensesItems = document.querySelectorAll('.expenses-items'),  // блок с инпутами обязательных расходов
    targetAmount = document.querySelector('.target-amount'),
    periodAmount = document.querySelector('.period-amount');
        //Правая сторона программы, результаты
        let result = document.querySelector('.result');
let budgetMonthValue = result.querySelector('.budget_month-value'), // доход за месяц
budgetDayValue = result.querySelector('.budget_day-value'), // Дневной бюджет
expensesMonthValue = result.querySelector('.expenses_month-value'), // Расход за месяц
additionalIncomeValue = result.querySelector('.additional_income-value'), // Возможные доходы
additionalExpensesValue = result.querySelector('.additional_expenses-value'), // Возможные расходы
incomePeriodValue = result.querySelector('.income_period-value'), // Накопления за период
targetMonthValue = result.querySelector('.target_month-value'); // Срок достижения цели в месяцах

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

  start: function(){
    if (salaryAmount.value === '') {
      return;
    }
    appData.budget = +salaryAmount.value;
    
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getIncomeMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    
    appData.getBudget();
    appData.showResult();
    appData.blocked();
  },

  showResult: function(){   // выводит результат на экран в инпуты после нажатия кнопки расчитать
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();

    periodSelect.addEventListener('input', function(){
      incomePeriodValue.value = appData.calcSavedMoney();
    });

  },
  blocked: function(){
    let input = document.querySelectorAll('.data input');
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
    expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3) {
      plusExpenses.style.display = 'none';
    }
  },

  addIncomeBlock() {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, plusIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
      plusIncome.style.display = 'none';
    }
  },
  
  getExpenses: function() {
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses;
      }
      
    });
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = cashIncome;
      }
    });
  },

  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item => {
      item = item.trim();
      if (item !== ''){
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome : function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(item.value !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },

  getExpensesMonth: function(){   //Функция возвращает сумму всех расходов за месяц
    for (let key in appData.expenses) {
       appData.expensesMonth += +appData.expenses[key];
      
    }
    
  },
  getIncomeMonth: function(){
    for(let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },

  getBudget: function(){     
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth ; //месячный доход с учетом обязательных расходов
    appData.budgetDay = Math.ceil(appData.budgetMonth / 30);   //дневной бюджет с учетом обязательных расходов
  },

  getTargetMonth: function(){      //Функция подсчитывает за какой период будет достигнута цель
    return targetAmount.value / appData.budgetMonth;  
  },

// getStatusIncome: function(){
//   if(appData.budgetDay >= 800) {
//     return ('Высокий уровень дохода');
//   }else if(appData.budgetDay >= 300 && appData.budgetDay < 800){
//     return ('Средний уровень дохода');
//   }else if(appData.budgetDay < 300 && appData.budgetDay > 0){
//     return ('Низкий уровень дохода');
//   }else{
//     return ('Что то пошло не так!!!');
//   }
// },

// getInfoDeposit: function(){
//   appData.deposit = confirm('Есть ли у вас депозит в банке?');
//   if(appData.deposit){
//     do{
//       appData.percentDeposit = prompt('Какой годовой процент?', 10);
//     }while(isNaN(appData.percentDeposit)|| appData.percentDeposit === '' || appData.percentDeposit === null);
//     do{ 
//       appData.moneyDeposit = prompt('Какая сумма вклада?', 100000);
//     }while(isNaN(appData.moneyDeposit)|| appData.moneyDeposit === '' || appData.moneyDeposit === null);
//   }
// },

calcSavedMoney: () => appData.budgetMonth * periodSelect.value,



upperCase: function(){
  for( let i = 0; i < appData.addExpenses.length; i++){
    appData.addExpenses[i] = appData.addExpenses[i].trim();
    appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].toLowerCase().slice(1);
    console.log(appData.addExpenses[i]);
  }
  console.log(appData.addExpenses);
  },
  

};
            //Обработчики событий
start.addEventListener('click', appData.start);
plusExpenses.addEventListener('click', appData.addExpensesBlock);
plusIncome.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function(){
  document.querySelector('.period-amount').textContent = periodSelect.value;
});






