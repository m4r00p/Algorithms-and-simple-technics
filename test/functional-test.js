TestCase("FunctionalTestCase", {
  testBind: function () {
    var fn = function (a, b, c) {
      return a + b + c;
    };

    var boundedAll = fn.bind(this, 1, 1, 1);

    assertEquals("Arguments should be bounded", 3, boundedAll());
  },

  testSaturate: function () {
    var fn = function (a, b, c) {
      return a + b + c;
    };

    var saturatedFn = fn.saturate();

    assertTrue("Arguments should be bounded", isNaN(saturatedFn()));
  },

  testCurry: function () {
    var fn = function (a, b, c) {
      return a + b + c;
    };

    var curriedFn = fn.curry(1, 1);

    assertEquals("Arguments should be curried", 3, curriedFn(1));
  },

  testMemoize: function () {
    var count = 0;
    var fn = function (a, b) {
      count++;
      return a + b ;
    };

    var memoizedFn = fn.memoize();

    assertEquals("Function should be memoized", 2, memoizedFn(1, 1));
    assertEquals("Function should be memoized", 2, memoizedFn(1, 1));
    assertEquals("Orginal function should be executed only once", 1, count);
  }
});
