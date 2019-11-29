'use strict';
const qs = document.querySelector.bind(document);
const qsAll = document.querySelectorAll.bind(document);

        //Левая сторона программы
        const data = qs('.data');
const salaryAmount = qs('.salary-amount'),  //Месячный доход
    
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
    depositCheck = qs('#deposit-check'),  // чекбокс депозит
    
    targetAmount = qs('.target-amount'),
    periodAmount = qs('.period-amount'),
    depositBank = qs('.deposit-bank'),
    depositAmount = qs('.deposit-amount'),
    depositPercent = qs('.deposit-percent');
    let expensesItems = qsAll('.expenses-items'),  // блок с инпутами обязательных расходов
    incomeItems = qsAll('.income-items');
        //Правая сторона программы, результаты
        const result = qs('.result'),
        budgetMonthValue = qs('.budget_month-value'), // доход за месяц
        budgetDayValue = qs('.budget_day-value'), // Дневной бюджет
        expensesMonthValue = qs('.expenses_month-value'), // Расход за месяц
        additionalIncomeValue = qs('.additional_income-value'), // Возможные доходы
        additionalExpensesValue = qs('.additional_expenses-value'), // Возможные расходы
        incomePeriodValue = qs('.income_period-value'), // Накопления за период
        targetMonthValue = qs('.target_month-value'); // Срок достижения цели в месяцах

start.disabled = false;

class AppData  {
  constructor() {
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

  start() {
    if (salaryAmount.value === '') {
      return;
    }
    this.budget = +salaryAmount.value;
    
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getIncomeMonth();
    this.getAddExpInc();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
    this.blocked();
  }
  
  showResult()  {   
    budgetMonthValue.value = Math.floor(this.budgetMonth);
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', () => incomePeriodValue.value = this.calcSavedMoney());
  
  }
  
  blocked() {
    const input = qsAll('.data input');
     input.forEach(function(item){
       if(item.className !== "period-select") {
       item.disabled = true;
     }
     });
     start.style.display = 'none';
     cancel.style.display = 'block';
   }
  
   addExpIncBlock(item, plus, cb) {
    let clone = item[0].cloneNode(true);
    item[0].parentNode.insertBefore(clone, plus);
    if(item.length === 2) {
      plus.style.display = 'none';
    }
    return cb();
  }
  
  getExpenses() {
    expensesItems.forEach(item => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = +item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        this.expenses[itemExpenses] = cashExpenses;
      }
      
    });
  }
  getIncome() {
    incomeItems.forEach(item => {
      let itemIncome = item.querySelector('input.income-title').value;
      let cashIncome = +item.querySelector('input.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        this.income[itemIncome] = cashIncome;
      }
    });
  }
  
  getAddExpInc() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item => item !== '' && this.addExpenses.push(item.trim()));
    additionalIncomeItem.forEach(item => item.value !== '' && this.addIncome.push(item.value.trim()));
  }
  
  getExpensesMonth() {   //Функция возвращает сумму всех расходов за месяц
    for (let key in this.expenses) {
       this.expensesMonth += this.expenses[key];
    }
    
  }
  getIncomeMonth() {
    for(let key in this.income) {
      this.incomeMonth += this.income[key];
    }
  };
  
  getBudget() {  
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit * this.percentDeposit) / 12; //месячный доход с учетом обязательных расходов
    this.budgetDay = Math.ceil(this.budgetMonth / 30);   //дневной бюджет с учетом обязательных расходов
  }
  
  getTargetMonth() { //Функция подсчитывает за какой период будет достигнута цель
   return targetAmount.value / this.budgetMonth;
  }  
     
  
  
  calcSavedMoney() {
  return this.budgetMonth * periodSelect.value;
  
  }
      
  upperCase()  {  //делает в массиве первые буквы Заглавными
  for( let i = 0; i < this.addExpenses.length; i++){
    this.addExpenses[i] = this.addExpenses[i].trim();
    this.addExpenses[i] = this.addExpenses[i][0].toUpperCase() + this.addExpenses[i].toLowerCase().slice(1);
    
  }
  }
  getInfoDeposit() {
    this.percentDeposit = depositPercent.value;
    this.moneyDeposit = depositAmount.value;
  }
  
  EventListener() {
    start.addEventListener('click', () => appData.start());
    cancel.addEventListener('click', () => { 
      start.style.display = 'block';
      cancel.style.display = 'none';
      appData.prototype = new AppData();
      this.budgetMonth = 0;
      let allInput = qsAll('input');
      allInput.forEach(input => {
      periodSelect.value = 1;
      input.disabled = false;
      input.value = '';
      qs('.period-amount').textContent = periodSelect.value;
      });
      plusExpenses.style.display = 'block';
      qsAll('.income-items').forEach((item, index) => index >= 1 && item.remove());
      plusIncome.style.display = 'block';
      qsAll('.expenses-items').forEach((item, index) => index >= 1 && item.remove());
      });
  
      plusExpenses.addEventListener('click', () => appData.addExpIncBlock(qsAll('.expenses-items'), plusExpenses, () => expensesItems = qsAll('.expenses-items')));
      plusIncome.addEventListener('click', () => appData.addExpIncBlock(qsAll('.income-items'), plusIncome, () => incomeItems = qsAll('.income-items')));
  
      periodSelect.addEventListener('input', function(){
        qs('.period-amount').textContent = periodSelect.value;
      });
  
      depositCheck.addEventListener('change',function() {
        if(depositCheck.checked === true) {
          depositBank.style.display = 'inline-block';
          depositAmount.style.display = 'inline-block';
          appData.deposit = 'true';
          depositBank.addEventListener('change', function() {
            let selectIndex = this.options[this.selectedIndex].value;
            if(selectIndex === 'other') {
              depositPercent.style.display = 'inline-block';
              depositPercent.disabled = false;
              depositPercent.value = '';
           } else {
             depositPercent.style.display = 'none';
             depositPercent.value = selectIndex;
           }
          });
        }else {
          depositBank.style.display = 'none';
          depositAmount.style.display = 'none';
          depositAmount.value = '';
          appData.deposit = 'false';
        }
      });
   }


}



 let appData = new AppData();
 appData.EventListener();
            




