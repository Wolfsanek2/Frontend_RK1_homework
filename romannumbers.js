// Реализовать создание следующую запись ;]
// ...

const ROMAN_NUMBERS = {
    I: 1,
    V: 5,
    X: 10,
};

const romanToArabic = (roman) => {
    let result = 0;
    let prev;
    for (let cur of roman) {
        cur = ROMAN_NUMBERS[cur];
        if (prev < cur) {
            result = cur - result;
        } else {
            result += cur;
        }
        prev = cur;
    }
    return result;
};

const handler = {
    get(target, prop, receiver) {
        const length = romanToArabic(prop);
        return Array.from({length}, (v, k) => v = k);
    },
};
Number.prototype.__proto__ = new Proxy(Number.prototype.__proto__, handler);

console.log(0..V); // [0, 1, 2, 3, 4];
console.log(0..VII); // [0, 1, 2, 3, 4, 5, 6];
