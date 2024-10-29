// Реализовать класс Futures

const states = {
    pending: 'pending',
    fullfied: 'fullfied',
    rejected: 'rejected',
};

function Futures(executor) {
    this.executor = executor;
    this.state = states.pending;
    const resolve = (value) => {
        this.state = states.fullfied;
        this.value = value;
    };
    const reject = (error) => {
        this.state = states.rejected;
        this.value = error;
    };
    const pending = async () => {
        this.executor(
            (value) => {
                resolve(value);
            },
            (error) => {
                reject(error);
            },
        );
    };
    pending();
    return this;
}

Futures.prototype.then = function (onFullfied, onRejected) {
    const pending = async () => {
        const iteration = () => {
            return () => {
                switch (this.state) {
                    case states.pending:
                        setTimeout(iteration(), 0);
                        break;
                    case states.fullfied:
                        onFullfied(this.value);
                        break;
                    case states.rejected:
                        onRejected(this.value);
                        break;
                }
            };
        };
        iteration()();
    };
    pending();
    return this;
};

// Тест #1
var foo = new Futures(function (resolve, reject) {
    resolve(123);
});

foo.then(
    function (val) {
        console.log('foo.resolved:', val === 123);
    },
    function () {
        console.log('foo.resolved: fail');
    },
);

// Тест #2
var bar = new Futures(function (resolve, reject) {
    setTimeout(resolve.bind(null, 'fail'), 300);
    setTimeout(reject.bind(null, 'ok'), 200);
});

bar.then(
    function () {
        console.log('bar.rejected: fail');
    },
    function (val) {
        console.log('bar.rejected:', val === 'ok');
    },
);
