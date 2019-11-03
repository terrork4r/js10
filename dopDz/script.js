'use stict';



// 1) Выведите на страницу текущую дату и время в формате '09:59:59 30.05.2018'

// 2) Напишите функцию, которая будет добавлять 0 перед значениями которые
//  состоят из одной цифры (из 9:5:3  1.6.2019 сделает 09:05:03 01.06.2019)





let addition = function(){
  let body = document.querySelector('body');
let data = new Date();
let date = data.getDate()+'.'+data.getMonth()+'.'+data.getFullYear();
let time = data.getHours()+':'+data.getMinutes()+':'+data.getSeconds();

 let arr = date.split('.'),
     arr1 = time.split(':');
 
  for(let i = 0; i < arr.length; i++){
    if(arr[i].length < 2){
      arr[i] = 0 + arr[i][0];
    }
  }
  for(let b = 0; b < arr.length; b++){
    if(arr1[b].length < 2){
      arr1[b] = 0 + arr1[b][0];
    }
  }
  let newElem = document.createElement('div');
  newElem.innerHTML ='Дата:'+ arr[0]+'.'+arr[1]+'.'+arr[2]+ ' Время: ' + arr1[0]+':'+arr1[1]+':'+arr1[2];
  body.append(newElem);
  
};
addition();

// window.onload = function(){
//       (function(){
//           var date = new Date();
//           var time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
//           document.getElementsByTagName('div')[0].innerHTML = time;
//           window.setTimeout(arguments.callee, 1000);
//       })();
//   };
  