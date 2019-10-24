'use stict';
// первый вариант

 const lineHandler =  (text) => {
   if(typeof text !== 'string') {
    return console.log('Проверьте правильность ввода, что то пошло не так', typeof text);}
    return text.length > 30 ? console.log(text.trim().slice(0, 29) + '...') : console.log(text.trim());
 };
 lineHandler('Приветтттттттттттттттттттттттттттттттттттттттттттттттттттт');

// второй вариант 

const lineHandler2 = (text2) => typeof text2 === 'string' ? text2.length > 30 ? 
console.log(text2.trim().slice(0, 29) + '...')
: console.log(text2.trim()) : console.log('Error!!! Что то пошло не так проверьте тип данных');

lineHandler2('Приветттттттттттттттттттттттттттттттттттттттттттттт.');