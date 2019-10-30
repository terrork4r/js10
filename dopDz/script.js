'use stict';
// 1) Создать массив week и записать в него дни недели в виде строк
// ·        Вывести на экран все дни недели
// ·        Каждый из них с новой строчки
// ·        Выходные дни - курсивом
// ·        Текущий день - жирным шрифтом(использовать объект даты)
let data = new Date();
let week = ['воскресенье', 'понедельник', 'вторние', 'среда', 'четверг', 'пятница', 'суббота'];
for(let i =0; i<7; i++){
  
  if(week[i] === 'суббота' || week[i] === 'воскресенье'){
    console.log('%c' + week[i], "font-style: italic;");
  }
  if(week[i] === week[data.getDay()]){
    console.log('%c' + week[i], "font-weight: bold;");
  }
  if(week[i] === 'суббота' || week[i] === 'воскресенье'|| week[i] === week[data.getDay()]){
   continue;
  }
  console.log(week[i]);
}

