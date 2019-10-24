'use stict';


 const lineHandler =  (text) => {
   if(typeof text !== 'string') {
    return console.log('Проверьте правильность ввода, что то пошло не так', typeof text);}
    return text.length > 30 ? console.log(text.trim().slice(0, 29) + '...') : console.log(text.trim());
 };
 lineHandler('Приветтттттттттттттттттттттттттттттттттттттттттттттттттттт');