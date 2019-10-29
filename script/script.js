'use strict';
let money, //месячный доход
    start = function(){
      do {
      money = prompt ('Ваш месячный доход?', 40000) ;
      console.log ('месячный доход:', money, 'руб') ;
      } while (isNaN(money) || money === '' || money === null) ;
    };     
start(); 

let appData = {
  budget: money,
  income: {}, // дополнительные расходы
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 1000000,
  period: 12,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function(){
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
      'бензин, активный отдых, фитнес');
      appData.addExpenses = addExpenses.toLowerCase().split(',');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },

  getExpensesMonth: function(){   //Функция возвращает сумму всех расходов за месяц
    let sum = 0,
        howMutch;
    for(let i = 0; i < 2; i++) {
      if (i === 0){
        expenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Квартплата');
      }
      if (i === 1){
        expenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Оплата интернета');
      }
      howMutch = prompt('Во сколько это обойдется?', 5000);
      while (isNaN(howMutch) || howMutch === '' || howMutch === null) {
        howMutch = prompt('Во сколько это обойдется?', 5000);
      }
      sum += +howMutch;
    }
    console.log('сумма ежемесячных расходов равна:', sum, 'руб');
    return sum;
  },

  getAccumulatedMonth: function(){     //Функция возвращает Накопления за месяц (Доходы минус расходы)
    return money - expensesAmount;
  },

  getTargetMonth: function(){      //Функция подсчитывает за какой период будет достигнута цель
    let missionComplete = appData.mission / accumulatedMonth;
    if(missionComplete < 0) {
      console.log('Цель не будет достигнута');
    }else{
      console.log('Колличество месяцев для достижения цели:', Math.ceil(missionComplete));
    }
},

getStatusIncome: function(){
  if(appData.budgetDay >= 800) {
    return ('Высокий уровень дохода');
  }else if(appData.budgetDay >= 300 && appData.budgetDay < 800){
    return ('Средний уровень дохода');
  }else if(appData.budgetDay < 300 && appData.budgetDay > 0){
    return ('Низкий уровень дохода');
  }else{
    return ('Что то пошло не так!!!');
  }
},
};

 let expenses1, 
     expenses2;


              
let expensesAmount = appData.getExpensesMonth();
appData.budgetMonth = money - expensesAmount ; //месячный доход с учетом обязательных расходов
appData.budgetDay = appData.budgetMonth / 30;   //дневной бюджет с учетом обязательных расходов


            //ВЫЗОВ ФУНКЦИЙ
let accumulatedMonth = appData.getAccumulatedMonth(); //Накопления за месяц
appData.getTargetMonth();


console.log('Накопления за месяц:', accumulatedMonth, 'руб');
console.log(appData.getStatusIncome());







