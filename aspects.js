var aspect = (function () {
    var out = {};

    var __checkAndExecute = function (obj, fn, aspectFn, when, once, callback) {
        var i, len, typeFn = Object.prototype.toString.call(fn);

        if (typeFn === "[object Array]") {
            for (i = 0, len = fn.length; i < len; i++) {
                if (obj[fn[i]]) {
                    callback(obj, fn[i], aspectFn.bind(), when, once);
                }
            }
            return;
        } else if (typeFn === "[object RegExp]") {
            for (i in obj) {
                if (i.match(fn)) {
                    callback(obj, i, aspectFn.bind(), when, once);
                }
            }
            return;
        } else if (typeFn !== "[object String]") {
            throw new TypeError("fn should be String|Array|RegExp but is " + typeFn);
        } 

        if (!obj[fn]) {
            throw new TypeError("Function of given name [" +fn+ "] not extists!!!");
        }
    };

    var __executeAspects = function (obj, fn, aspects, when) {
        var i, len, aspectFn;

        aspects = aspects[when];

        for(i = 0, len = aspects.length; i < len; i++) {
            aspectFn = aspects[i];
            aspectFn();
            if (aspectFn.once) {
                out.remove(obj, fn, aspectFn, when);
                i--;
                len--;
            }
        } 
    };

    
    out.add = function (obj, fn, aspectFn, when, once) {
        var that   = this;

        obj  = obj  || window;
        when = when || "before";
        once = once || false;

        __checkAndExecute(obj, fn, aspectFn, when, once, this.add);

        obj.$$aspects     = obj.$$aspects || {};
        obj.$$aspects[fn] = obj.$$aspects[fn] || {
            org: obj[fn],
            before: [],
            after: []
        };

        aspectFn.once = once;
        obj.$$aspects[fn][when].push(aspectFn);

        obj[fn] = function () {
            var result,
            aspects = obj.$$aspects[fn];

            __executeAspects(obj, fn, aspects, "before");

            result = obj.$$aspects[fn].org.apply(obj, Array.prototype.slice.call(arguments));

            __executeAspects(obj, fn, aspects, "after");

            return result;
        };

        return this;
    };

    out.remove = function(obj, fn, aspectFn, when) {
        var aspects;

        obj  = obj  || window;
        when = when || "before";

        __checkAndExecute(obj, fn, aspectFn, when, undefined, this.remove);

        if (obj.$$aspects && obj.$$aspects[fn] && obj.$$aspects[fn][when]) {
            aspects = obj.$$aspects[fn][when];

            for (i = 0, len = aspects.length; i < len; i++) {
                if (aspects[i] === aspectFn) {
                    aspects.splice(i,1);
                }
            }

            if (!obj.$$aspects[fn].before.length && !obj.$$aspects[fn].after.length) {
                obj[fn] = obj.$$aspects[fn].org;
            }
        }
    };

    return out;
}());
