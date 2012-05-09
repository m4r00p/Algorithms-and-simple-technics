//
// Memoization
//
// Example based on word famoust recursive fibonacci algorithm ;]
//

// Global variable to handle number of interation needed to computation 
var iteration = 0;



// Basic recursive implementation of Fibonacci algorithm
var fib = function (n) {
    if (n === 0 || n === 1) { 
        return 1;
    } 

    iteration++;
    return fib(n - 1) + fib(n - 2);
};

// Results
iteration = 0;
print("fib(15): " + fib(15) + " iteration: " + iteration);
iteration = 0;
print("fib(30): " + fib(30) + " iteration: " + iteration);
iteration = 0;
print("fib(45): " + fib(45) + " iteration: " + iteration);
// Whata beutiful exponential algorithm ;D



// Another implementation with memoization (Dynamic programming aproach/overlaping)
var fibMemo = function (n, memo) {
    return  memo[n] || ++iteration && (memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo));
};

// Results
iteration = 0;
print("fibmemo(15): " + fibMemo(15, [1, 1]) + " iteration: " + iteration);
iteration = 0;
print("fibmemo(30): " + fibMemo(30, [1, 1]) + " iteration: " + iteration);
iteration = 0;
print("fibMemo(45): " + fibMemo(45, [1, 1]) + " iteration: " + iteration);
// Awsome isn't it?

// Maybe messing with prototype isn't right way...
Function.prototype.memoize = function () {
    var memo = {};
    var that = this;

    var fn =  function () {
        var args = Array.prototype.slice.call(arguments);
        var item = memo[args];

        return item || (memo[args] = that.apply(null, args));  
    };

    fn.unmemoize = function () {
        return that; 
    };

    return fn;
};

Function.prototype.unmemoize = function () {
    throw new Error("This function wasn't memoize before!!!");
};

//Results
fib = fib.memoize();
iteration = 0;
print("fib.memoize(15): " + fib(15) + " iteration: " + iteration);
iteration = 0;
print("fib.memoize(30): " + fib(30) + " iteration: " + iteration);
iteration = 0;
print("fib.memoize(45): " + fib(45) + " iteration: " + iteration);
// Sadly this solution isn't free, just look at memory usage... 
