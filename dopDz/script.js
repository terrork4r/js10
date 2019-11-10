'use stict';
console.log(this);


let obj = {
  a: 10,
  b: 15,
  c: function(){
    console.log(this);
  },
  
};

let fun = function(){
  console.log(this);
};
let x = fun.bind(obj);
x();