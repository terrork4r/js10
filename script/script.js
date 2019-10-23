'use strict';


let money = +prompt('Ваш месячный доход?', 40000),
    income = 'фриланс', // строка с дополнительными доходом 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
     'бензин, активный отдых, фитнес'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 1000000, //Какую сумму хотите накопить
    period = 12;
    
let expenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Квартплата'),
    amountOfExpenses1 = +prompt('Во сколько это обойдется?', 5000),
    expenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Оплата интернета'),
    amountOfExpenses2 = +prompt('Во сколько это обойдется?', 1000);

let budgetMonth = money - (amountOfExpenses1 + amountOfExpenses2) , //месячный доход с учетом обязательных расходов
    budgetDay = budgetMonth / 30;   //дневной бюджет с учетом обязательных расходов


              //ФУНКЦИИ
const showTypeOf = function(data){        //Функция выводит в консоль тип данных для проверки
  console.log('тип данных ', data , ':', typeof data);
}; 

const getExpensesMonth = function(){   //Функция возвращает сумму всех расходов за месяц
  return amountOfExpenses1 + amountOfExpenses2;
};

const getAccumulatedMonth = function(){     //Функция возвращает Накопления за месяц (Доходы минус расходы)
  return money - getExpensesMonth();
};

const getTargetMonth = function(){      //Функция подсчитывает за какой период будет достигнута цель
    return mission / accumulatedMonth;
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
getExpensesMonth();
let accumulatedMonth = getAccumulatedMonth(); //Накопления за месяц
getTargetMonth();


console.log('Накопления за месяц:', accumulatedMonth);
console.log('Колличество месяцев для достижения цели:', Math.floor(getTargetMonth()));
console.log(getStatusIncome());







