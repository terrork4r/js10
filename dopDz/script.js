'use stict';
let car = {
  collor: 'red',
  speed: 200,
  model: 'lada',
  year: 2010,
};
for( let key in car){
  console.log(key);
}

let arr = [1, 2, 4, 3, 5];
console.log(arr.join());