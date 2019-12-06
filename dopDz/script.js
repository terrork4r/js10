'use strict';

const qs = document.querySelector.bind(document);
const qsAll = document.querySelectorAll.bind(document);


const box1 = qs('.box1'),
      box2 = qs('.box2');
let interval;
let count = 0;
let animate = function() {
  interval = requestAnimationFrame(animate);    
    count++;
    if(count < 500){
    box1.style.top = count + 'px';
    box1.style.left = count / 2 + 'px';
    box2.style.left = count * 2 + 'px';
    }else {
      count = 0;
    }
};
let a = false;
document.addEventListener('click', () => {
  if(a) {
  interval = requestAnimationFrame(animate); 
  a = false;
  }else {
    a = true;
    cancelAnimationFrame(interval);
  }
});