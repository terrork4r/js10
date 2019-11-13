'use strict';
let a = document.querySelector('#a'),
    b = document.querySelector('#b'),
    sum = document.querySelector('#sum'),
    mult = document.querySelector('#mult'),
    res = document.querySelector('#res');
const calculator = {
  sum: function(){
    res.value = Number(a.value) + Number(b.value);
  },
  mult: function(){
    res.value = a.value * b.value;
  },
  show: function(){
    
  }
};

sum.addEventListener('click', calculator.sum);
mult.addEventListener('click', calculator.mult);