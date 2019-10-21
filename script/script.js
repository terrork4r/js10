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


console.log ('тип данных money:', typeof money);
console.log ('тип данных income:', typeof income);
console.log ('тип данных deposit:', typeof deposit);

console.log ('возможные расходы', addExpenses.toLowerCase().split(', '));

console.log('Месячный доход с учетом расходов:', budgetMonth);
console.log('Дневной бюджет:', Math.floor(budgetDay));

console.log('Цель будет достигнута через', Math.ceil(mission / budgetMonth), 'месяцев');


// Написать конструкцию условий		
// Если budgetDay больше 800, то “Высокий уровень дохода”
// Если budgetDay больше 300 и меньше 800, то сообщение “Средний уровень дохода”
// Если budgetDay больше 0 и меньше 300 то в консоль вывести сообщение “Низкий уровень дохода”
// Если отрицательное значение то вывести “Что то пошло не так”
// учесть варианты 0, 300 и 800

if(budgetDay >= 800) {
  console.log('Высокий уровень дохода');
}else if(budgetDay >= 300 && budgetDay < 800){
  console.log('Средний уровень дохода');
}else if(budgetDay < 300 && budgetDay > 0){
  console.log('Низкий уровень дохода');
}else{
  console.log('Что то пошло не так!!!');
}