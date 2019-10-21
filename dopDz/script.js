'use strict';

let lang = prompt('Введите удобный для вас язык в формате ru или en', 'ru');
const ru = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
      en = ['mn', 'ts', 'wd', 'th', 'fr', 'st', 'sn'],
      error = 'Что то пошло не так, попробуйте перезагрузите страницу и убедитесь в правильности ввода языка';

if(lang === 'ru'){
  alert(ru);
}else if(lang === 'en'){
  alert(en);
}else{
  alert(error);
}


switch(lang){
  case 'ru': 
    alert(ru);
  break;
  case 'en':
    alert(en);
    break;
  default:
      alert(error);   
}

const arr = [ru, en];

let result = lang === 'ru' ? alert(arr[0]) : lang === 'en' ? alert(arr[1]) : alert(error);



const namePerson = prompt('Введите ваше имя', 'Влад');

let result2 = namePerson === 'Артём' ? console.log('Директор') : 
              namePerson === 'Максим' ? console.log('Преподаватель') :
              console.log('Студент');