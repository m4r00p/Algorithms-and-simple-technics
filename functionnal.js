
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


//combo
a.bind(null, "Wawa to").curry("Raga muffin").saturate()();
