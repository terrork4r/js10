'use strict';
class Car {
  constructor() {
    this.brand = 'mazda';
    this.model = 3;
  }
  fun() {
    console.log(this.brand + ' ' + this.model);
    Car.yes++;
  }
}
Car.yes = 0;

const car = new Car();
const car1 = new Car();
car.fun();
car1.fun();
console.log(Car.yes);