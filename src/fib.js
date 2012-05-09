var fibExp = function (n) {
    if (n < 2) {
        return n; 
    } 

    return fibExp(n - 1) + fibExp(n - 2);
};


var fibLin = function (n) {
    var a = 0, b = 1, c; 

    while(n--) {
        c  = a;
        a  = b;
        b += c;        
    }

    return a;
};

var matrixMul = function (a, b) {
    return [[
        a[0][0] * b[0][0] + a[0][1] * b[1][0],
        a[0][0] * b[0][1] + a[0][1] * b[1][1]
    ], [
        a[1][0] * b[0][0] + a[1][1] * b[1][0],
        a[1][0] * b[0][1] + a[1][1] * b[1][1]
    ]];
};

var matrixPow = function (a, n) {
    if (n == 1) {
        return a;
    } else if (n % 2) {
        return matrixMul(a, matrixPow(matrixMul(a, a), parseInt(n/2, 10)));
    } else {
        return matrixPow(matrixMul(a,a), n/2);
    }
};

var fibLog = function (n) {
    var a = [
        [1, 1], 
        [1, 0]
    ]; 
    
    return matrixPow(a, n)[1][0];
};
