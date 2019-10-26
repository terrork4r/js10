'use strict';


let money; //месячный доход
start(); 
let income = 'фриланс', // строка с дополнительными доходом 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
     'бензин, активный отдых, фитнес'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000, //Какую сумму хотите накопить
    period = 12;

 function start(){
  do {
  money = prompt ('Ваш месячный доход?', 40000) ;
  console.log ('месячный доход:', money, 'руб') ;
  } while (isNaN(money) || money === '' || money === null) ;
}    
   
 let expenses1, 
     expenses2;


              //ФУНКЦИИ
const showTypeOf = function(data){        //Функция выводит в консоль тип данных для проверки
  console.log('тип данных ', data , ':', typeof data);
}; 

const getExpensesMonth = function(){   //Функция возвращает сумму всех расходов за месяц
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
};
let expensesAmount = getExpensesMonth();
let budgetMonth = money - expensesAmount ; //месячный доход с учетом обязательных расходов
let budgetDay = budgetMonth / 30;   //дневной бюджет с учетом обязательных расходов
const getAccumulatedMonth = function(){     //Функция возвращает Накопления за месяц (Доходы минус расходы)
  return money - expensesAmount;
};

const getTargetMonth = function(){      //Функция подсчитывает за какой период будет достигнута цель
    let missionComplete = mission / accumulatedMonth;
    if(missionComplete < 0) {
      console.log('Цель не будет достигнута');
    }else{
      console.log('Колличество месяцев для достижения цели:', Math.ceil(missionComplete));
    }
};

const getStatusIncome = function(){
  if(budgetDay >= 800) {
    return ('Высокий уровень дохода');
  }else if(budgetDay >= 300 && budgetDay < 800){
    return ('Средний уровень дохода');
  }else if(budgetDay < 300 && budgetDay > 0){
    return ('Низкий уровень дохода');
  }else{
    return ('Что то пошло не так!!!');
  }
};

            //ВЫЗОВ ФУНКЦИЙ
showTypeOf(money);  
showTypeOf(income);
showTypeOf(deposit); 
let accumulatedMonth = getAccumulatedMonth(); //Накопления за месяц
getTargetMonth();


console.log('Накопления за месяц:', accumulatedMonth, 'руб');
console.log(getStatusIncome());







