'use strict';
class Car {
  constructor() {
    this.brand = 'mazda';
    this._model = 3;
  }
  fun() {
    console.log(this.brand + ' ' + this.model);
    Car.yes++;
  }
}
const car = new Car();
console.log(Car._model);