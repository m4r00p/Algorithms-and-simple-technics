var fibExp = function (n) {
    if (n < 2) { return n; } 
    return fibExp(n - 1) + fibExp(n - 2);
};

self.onmessage =function(event) {
    var data = JSON.parse(event.data);

    var result = fibExp(data[0]);

    var start  = data[2];
    var time   = Date.now() - start;

    self.postMessage("iteration: " + data[1] + " result: " + result + " time: " + time + "ms");
};

