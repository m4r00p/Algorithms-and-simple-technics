// bind context and args to funciton 
Function.prototype.bind = function (ctx /* ... */) {
    var that = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fn = function () {
        return that.apply(ctx, args.concat(Array.prototype.slice.call(arguments)));
    };

    return fn;
};

// saturate funciton
Function.prototype.saturate = function () {
    var that = this;
    var args = Array.prototype.slice.call(arguments);

    var fn = function () {
        return that.apply(null, args);
    };

    return fn;
};

// curry arguments 
Function.prototype.curry = function () {
    var that = this;
    var args = Array.prototype.slice.call(arguments);

    var fn = function () {
        return that.apply(null, args.concat(Array.prototype.slice.call(arguments)));
    };

    return fn;
};

// memoizes execution
Function.prototype.memoize = function () {
    var memo = {};
    var that = this;

    var fn =  function () {
        var args = Array.prototype.slice.call(arguments);
        var item = memo[args] || (memo[args] = that.apply(null, args))

        return item;  
    };

    fn.unmemoize = function () {
        return that; 
    };

    return fn;
};

// Throw exeception if function was not memoize previously
Function.prototype.unmemoize = function () {
    throw new Error("This function wasn't memoize before!!!");
};
