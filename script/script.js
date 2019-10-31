'use strict';
let money, //месячный доход
    start = function(){
      do {
      money = prompt ('Ваш месячный доход?', 40000) ;
      } while (isNaN(money) || money === '' || money === null) ;
    };     
start(); 

let appData = {
  budget: money,        //наш доход
  income: {},         //дополниетльный доход
  addIncome: [],
  expenses: {},       // наши расходы
  addExpenses: [],    // дополнительные расходы
  deposit: false, 
  percentDeposit: 0, //процент под который положили депозит
  moneyDeposit: 0,   //колличество денег, которые положили на депозит
  mission: 1000000,  //наша цель
  period: 12,       // периуд для достижения цели
  budgetDay: 0,    //количество денег на день с учетом расходов
  budgetMonth: 0,  //месячный запас денег с учетом расходов
  expensesMonth: 0,   //затраты за месяц
  asking: function(){

    if(confirm('Есть ли у вас дополнительный источник заработка?')){
      let itemIncome,
          cashIncome;
      do{
         itemIncome = prompt('Какой у вас дополнительный заработок', 'фриланс');
      } while (!isNaN(itemIncome) || itemIncome === '' || itemIncome === null);
      do{ 
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 5000);
      } while(isNaN(cashIncome) || cashIncome === '' || cashIncome === null);
      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
      'бензин, активный отдых, фитнес');
      appData.addExpenses = addExpenses.split(',');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');

      
  for(let i = 0; i < 2; i++) {
    let expenses1,
        howMutch;
    do{
      expenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Квартплата');
    } while(!isNaN(expenses1) || expenses1 === '' || expenses1 === null);  

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

getInfoDeposit: function(){
  if(appData.deposit){
    do{
      appData.percentDeposit = prompt('Какой годовой процент?', 10);
    }while(isNaN(appData.percentDeposit)|| appData.percentDeposit === '' || appData.percentDeposit === null);
    do{ 
      appData.moneyDeposit = prompt('Какая сумма вклада?', 100000);
    }while(isNaN(appData.moneyDeposit)|| appData.moneyDeposit === '' || appData.moneyDeposit === null);
  }
},

calcSavedMoney: function(){
 return appData.budgetMonth * appData.period;
},

upperCase: function(){
  for( let i = 0; i < appData.addExpenses.length; i++){
    appData.addExpenses[i] = appData.addExpenses[i].trim();
    appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].toLowerCase().slice(1);
    console.log(appData.addExpenses[i]);
  }
  console.log(appData.addExpenses);
},

};


            //ВЫЗОВ ФУНКЦИЙ
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.upperCase();


console.log('Расходы за месяц:', appData.expensesMonth);

console.log(appData.getStatusIncome());
// console.log(appData);
// for(let key in appData){
//     console.log('Наша программа включает в себя данные:',key,':' , appData[key]);
// }

