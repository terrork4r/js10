'use strict';
let body = qs('body');
let delet = qs('.adv');
let ul = qsAll('ul');
let books = qs('.books');
let book = qsAll('.book');
let titleBook3 = book[4].querySelector('a');
let elemBook2 = ul[0].querySelectorAll('li');
let elemBook5 = ul[5].querySelectorAll('li');
let elemBook6 = ul[2].querySelectorAll('li');
console.log(elemBook6);

// -Заменить картинку заднего фона на другую из папки image
body.setAttribute('style', 'background-image: url(./image/you-dont-know-js.jpg)');
// -Удалить рекламу со страницы
body.removeChild(delet);

// -Восстановить порядок книг.
books.appendChild(book[2]);
books.insertBefore(book[1], book[0]);
books.insertBefore(book[3], book[5]);

// -Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
let titleNew = titleBook3;
titleNew.textContent = 'Книга 3. this и Прототипы Объектов';

// -Восстановить порядок глав во второй и 

ul[0].insertBefore(elemBook2[2], elemBook2[10]);
ul[0].insertBefore(elemBook2[7], elemBook2[9]);
ul[0].insertBefore(elemBook2[5], elemBook2[7]);
ul[0].insertBefore(elemBook2[4], elemBook2[5]);

// пятой книге
ul[5].insertBefore(elemBook5[2], elemBook5[6]);
ul[5].insertBefore(elemBook5[9], elemBook5[3]);
ul[5].insertBefore(elemBook5[5], elemBook5[8]);

// -в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
let newElem = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';
ul[2].insertBefore(newElem, elemBook6[9]);