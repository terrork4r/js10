// 1) Создать переменную num со значением 266219
//    ·  Вывести в консоль произведение (умножение) цифр этого числа
// 2) Полученный результат возвести в степень 3, используя только 1 оператор (Math.pow не подходит)
//    ·  Вывести на экран первые 2 цифры полученного числа

let num = 266219;
let sum = num.toString().split("");
console.log(sum);

const reducer = (accumulator, currentValue) => accumulator * currentValue;
let result = sum.reduce(reducer);
console.log(result);
result **= 3;
console.log(result);
alert(String(result).slice(0, 2));
