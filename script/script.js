'use strict';
let money, //месячный доход
    start = function(){
      do {
      money = prompt ('Ваш месячный доход?', 40000) ;
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

      
  for(let i = 0; i < 2; i++) {
    let expenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Квартплата'),
        howMutch;
    do{
      howMutch = prompt('Во сколько это обойдется?', 5000);
    }
    while (isNaN(howMutch) || howMutch === '' || howMutch === null);
    appData.expenses[expenses1] = howMutch;
  }
  
  },


  getExpensesMonth: function(){   //Функция возвращает сумму всех расходов за месяц
    for (let key in appData.expenses) {
       appData.expensesMonth += +appData.expenses[key];
      
    }
    
  },

  getBudget: function(){     
    appData.budgetMonth = appData.budget - appData.expensesMonth ; //месячный доход с учетом обязательных расходов
    appData.budgetDay = appData.budgetMonth / 30;   //дневной бюджет с учетом обязательных расходов
  },

  getTargetMonth: function(){      //Функция подсчитывает за какой период будет достигнута цель
    let missionComplete = appData.mission / appData.budgetMonth;
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




            //ВЫЗОВ ФУНКЦИЙ
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

// — Расходы за месяц
// — За какой период будет достигнута цель (в месяцах)
// — Уровень дохода


// 10) Используя цикл for in для объекта (appData), вывести в консоль сообщение
//  "Наша программа включает в себя данные: " (вывести весь appData)

console.log('Расходы за месяц:', appData.expensesMonth);

console.log(appData.getStatusIncome());

for(let key in appData){
    console.log('Наша программа включает в себя данные:',key,':' , appData[key]);
}