'use stict';
// 1) Создать массив week и записать в него дни недели в виде строк
// ·        Вывести на экран все дни недели
// ·        Каждый из них с новой строчки
// ·        Выходные дни - курсивом
// ·        Текущий день - жирным шрифтом(использовать объект даты)
let data = new Date();
let week = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
for(let i =0; i<7; i++){
  
  if(week[i] === 'суббота' || week[i] === 'воскресенье'){
    console.log('%c' + week[i], "font-style: italic;");
    if(week[i] === week[data.getDay()]){
    console.log('%c' + week[i], "font-weight: bold; font-style: italic;");
    }
  }
  if(week[i] === week[data.getDay()]){
    console.log('%c' + week[i], "font-weight: bold;");
  }
  if(week[i] === 'суббота' || week[i] === 'воскресенье'|| week[i] === week[data.getDay()]){
   continue;
  }
  console.log(week[i]);
}










let test = function(speed1, speed2, distance){
    let addSpeed = speed1 + speed2; // общая скорость
    let time = distance / addSpeed; // время через которое встретятся
    console.log('общая скорость:', addSpeed);
    console.log('Время через которое встретятся:', time);
};

test(50, 100, 500);






// let obj ={
//   add: 0,
//   obj2: {},
// };
// let expenses1, 
// expenses2;

// const getExpensesMonth = function(){   //Функция возвращает сумму всех расходов за месяц
// let howMutch,
//     howMutch1;
// for(let i = 0; i < 2; i++) {
// if (i === 0){
//   expenses1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Квартплата');
//   howMutch = prompt('Во сколько это обойдется?', 5000);
//     while (isNaN(howMutch) || howMutch === '' || howMutch === null) {
//       howMutch = prompt('Во сколько это обойдется?', 5000);
//     }
// }
// if (i === 1){
//  expenses2 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Оплата интернета');
//  howMutch1 = prompt('Во сколько это обойдется?', 5000);
//   while (isNaN(howMutch) || howMutch === '' || howMutch === null) {
//     howMutch1 = prompt('Во сколько это обойдется?', 5000);
//   }
// }

// while (isNaN(howMutch) || howMutch === '' || howMutch === null) {
//  howMutch = prompt('Во сколько это обойдется?', 5000);
// }
// }
// obj.obj2[expenses1] = howMutch;
// obj.obj2[expenses2] = howMutch1;
// };
// const getExpensesMonth1 = function(){
//   for (let key in obj.obj2) {
//     obj.add += +obj.obj2[key];
// }
// };
// getExpensesMonth();
// getExpensesMonth1();
// console.log(obj);