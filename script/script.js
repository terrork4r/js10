'use strict';
let money = 50000, // Доход за месяц
    income = 'фриланс', // строка с дополнительными доходом 
    addExpenses = 'Квартплата, интернет, фитнес', //строка с перечислением дополнительных расходов через запятую
    deposit = true,
    mission = 1000000, //Какую сумму хотите накопить
    period = 12;

let budgetDay = money / 30;   //дневной бюджет
    
console.log (typeof money);
console.log (typeof income);
console.log (typeof deposit);

console.log (income.length);

console.log('Период', period ,'месяцев');
console.log('Цель заработать', mission , 'рублей');

console.log (addExpenses.toLowerCase().split(', '));

console.log("Доход за день:", budgetDay);