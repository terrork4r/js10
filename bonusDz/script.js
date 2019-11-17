'use strict';
// let a = document.querySelector('#a'),
//     b = document.querySelector('#b'),
//     sum = document.querySelector('#sum'),
//     mult = document.querySelector('#mult'),
//     res = document.querySelector('#res');
    
// const calculator = {
//   result: 0,
//   sum: function(){
//     this.result = Number(a.value) + Number(b.value);
//     this.show();
//   },
//   mult: function(){
//     this.result = a.value * b.value;
//     this.show(); 
//   },
//   show: function(){
//     res.value = this.result;
//   }
// };

// sum.addEventListener('click', calculator.sum.bind(calculator));
// mult.addEventListener('click', calculator.mult.bind(calculator));

// Второе бонус задание
//  let showResult = function(a, b){
//    let res = a ** b;
//    res = String(res).split("");
//    console.log(res);
//    const reducer = (accumulator, currentValue) => +accumulator + +currentValue;
//    res = res.reduce(reducer);
//    console.log(res);
//  };
//  showResult(5, 10);



let arr = {
  a: 10,
  b: 12,
  c: {
    c1: () => {
      console.log(this);
    }
  },
  d: function() {
    console.log(this);
  },
  i: [1, 2, 3, 4],
};
arr.i.forEach(function(item) {
  console.log(this.a);
});

