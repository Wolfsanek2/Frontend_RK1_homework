// Возможно ли реализовать такое?

var a;

class MyClass {
    constructor() {
        this.counter = 0;
    }
    valueOf() {
        return this.counter++;
    }
}

a = new MyClass();

// Проверка
console.log(a == a); // true
console.log(a < a); // true
