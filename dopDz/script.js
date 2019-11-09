'use stict';
let box = document.querySelector('.box');
let input = document.querySelectorAll('input');
console.log(input);
let link = document.querySelector('a');
document.addEventListener('contextmenu', function(event){
  event.preventDefault();
  console.log('неожиданно');
});