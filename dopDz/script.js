'use stict';

// Создайте функцию, которая принимает 1 аргумент (название произвольное)
// — Если как аргумент передана не строка - функция оповещает об этом пользователя
// — В полученной (как аргумент) строке функция должна убрать все пробелы в начале и в конце
// — Если строка более 30 знаков - то после 30го символа часть текста скрывается и вместо них появляются три точки (...)
// const lineHandler = function (text) {
//     if (typeof text !== 'string') {
//       return console.log ('Проверьте правильность ввода, что то пошло не так') ;
//     }else if (text.length > 30) {
//       return console.log(text.trim().slice(0, 29) + '...');
//     } else if (typeof text == 'string') {
//       return console.log (text.trim()) ;
//      }
    
// };

// lineHandler ('Приветттттттттттттттттттттттттттттттттттттттттттттттттт');
 const lineHandler =  (text) => {
   if(typeof text !== 'string') {
     return console.log('Проверьте правильность ввода, что то пошло не так', typeof text);}
   return text.length > 30 ? console.log(text.trim().slice(0, 29) + '...') : console.log(text.trim());
 };
 lineHandler('                                                     Приветттттттттттттттттттттттттттттттттттттттттттттттттт');