/**
fail([msg])
assertTrue([msg], actual)
assertFalse([msg], actual)
assertEquals([msg], expected, actual)
assertSame([msg], expected, actual)
assertNotSame([msg], expected, actual)
assertNull([msg], actual)
assertNotNull([msg], actual)
*/

TestCase("AspectTestCase", {

  testBasic: function() {
    assertEquals("Should be a function", typeof aspect.add, "function");

    var btest = false;
    var obj = {
      x: 10,
      btest: function(){ btest = true; },
      pow10: function(y){ return Math.pow(this.x,y); }
    };
    window.fglobal = function(){};
    var tester = 0;

    assertEquals("Test method returns 100",  obj.pow10(2), 100);

    try {
      aspect.add("nonexist","nonexist", function(){ tester++});
      fail("Should throw TypeError");
    } catch (e) {
      if (!(e instanceof TypeError)) {
        fail("Should throw TypeError");
      }
    }

    aspect.add( null, "fglobal", function(){ tester++} );
    window.fglobal();

    aspect.add( obj, "btest", function(){ tester++ } );
    aspect.add( obj, "pow10", function(){ tester++ } );
    obj.btest();

    assertEquals("Btest function executed together with an aspect",  btest, true);
    assertEquals("pow10 function returns 100", obj.pow10(2), 100);
    assertEquals("Three aspect functions have been executed", tester, 3);

  },

  testAfter: function () {
    var obj = {
      x: 10,
      pow10: function(y){ return Math.pow(this.x,y); }
    };

    aspect.add(obj, "pow10", function(){ obj.x=11; }, "after");

    assertEquals("Modified function returns 100", obj.pow10(2), 100);
    assertEquals("Aspect executed once; and after the main function", obj.x, 11);
  },

  testOnce: function () {
    var obj = {
      x: 10,
      pow10: function(y){ return Math.pow(this.x,y); }
    };	

    var count = 0;
    aspect.add( obj, "pow10", function(){ count++; }, "before", true );
    obj.pow10(2);
    obj.pow10(2);

    assertEquals("Aspect should be executed only once", count, 1);
  },

  testRemove: function () {
    var obj = {
      x: 10,
      pow10: function(y){ return Math.pow(this.x,y); }
    };	

    var count = 0;
    var orig = obj.pow10;
    var asp = function(){ count++; };

    assertEquals("aspect.remove is a function", typeof aspect.remove, "function");
    aspect.add( obj, "pow10", asp, "before" );
    obj.pow10(2);
    aspect.remove( obj, "pow10", asp, "before" );
    obj.pow10(2);
    assertEquals("Aspect should be executed only once", count, 1);
    assertEquals("obj.pow10 refers back to the original function", obj.pow10, orig);
  },

  testMultipleAspects: function () {
    var obj = {
      x: 10,
      pow10: function(y){ return Math.pow(this.x,y); }
    };	

    var orig = obj.pow10;

    var c1=0, f1=function(){++c1};
    var c2=0, f2=function(){++c2};
    var c3=0, f3=function(){++c3};

    aspect.add( obj, "pow10", f1, "after", true );
    aspect.add( obj, "pow10", f2, "after", false );
    aspect.add( obj, "pow10", f3, "before", false );

    obj.pow10(2);
    obj.pow10(2);

    assertEquals("aspect f1 should execute once", c1, 1);
    assertEquals("aspect f2 should execute twice", c2, 2);
    assertEquals("aspect f3 should execute twice", c3, 2);

    aspect.remove( obj, "pow10", f3, "before" );
    aspect.remove( obj, "pow10", f1, "after" ); //removes nothing

    obj.pow10(2);

    assertEquals("aspect f1 should not execute more", c1, 1);
    assertEquals("aspect f2 should execute again", c2, 3);
    assertEquals("aspect f3 should not execute more", c3, 2);	

    assertNotEquals("obj.pow10 still is not an origianl function", orig, obj.pow10);

    aspect.remove( obj, "pow10", f2, "after" );
    assertEquals("obj.pow10 should refer to original function after f2 removal", orig, obj.pow10);
  },

  testArrays: function () {
  
    var obj = {
      f1: function(){},
      f2: function(){},
      f3: function(){}
    };	
    var cnt = 0;
    aspect.add( obj, ["f1","f3"], function(){++cnt} );
    obj.f1(); obj.f2(); obj.f3();

    assertEquals("Aspect function should be registered for two methods", cnt, 2);

    var cnt2 = 0;
    aspect.add( obj, ["f1","f2","f3"], function(){++cnt2}, "after", true );
    obj.f1(); obj.f2(); obj.f3();

    assertEquals("Same as previous - even when 'once' attribute is set", cnt2, 3);
  },

  testRegexps: function () {
    var obj = {
      f1: function(){},
      f2: function(){},
      f33: function(){},
    };	
    var cnt = 0;
    aspect.add( obj, /^f.$/, function(){++cnt} );
    obj.f1(); obj.f2(); obj.f33();

    assertEquals("Aspect function should be registered for two methods", cnt, 2);

    var cnt2 = 0;
    aspect.add( obj, /^f.$/, function(){++cnt2}, "after", true );
    obj.f1(); obj.f2(); obj.f33();

    assertEquals("Same as previous - even when 'once' attribute is set", cnt2, 2);
  }
});
