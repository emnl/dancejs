(function() {
  /*
    Dancejs Library v0.1.0
    http://github.com/emnl/dancejs
  
    Copyright 2011, Emanuel Andersson
    Dual licensed under the MIT or BeerWare licenses.
    https://github.com/emnl/dancejs/blob/master/README.md
  
    This project was inspired by the Haskell
    programming language and its standard library.
    Some native support functions was taken from
    Underscore (MIT), thanks guys!
  
    Date: 14 Oct 2011
  */  var nativeAll, nativeAny, nativeFilter, nativeFoldl, nativeFoldr, nativeMap, nativeSort, _ap, _np, _op;
  _ap = Array.prototype;
  _op = Object.prototype;
  _np = Number.prototype;
  nativeMap = _ap.map;
  nativeFoldl = _ap.reduce;
  nativeFoldr = _ap.reduceRight;
  nativeFilter = _ap.filter;
  nativeAll = _ap.every;
  nativeAny = _ap.some;
  nativeSort = _ap.sort;
  _ap.__defineGetter__("clone", function() {
    return this.slice(0, this.length);
  });
  _ap.__defineGetter__("tail", function() {
    if (this.length <= 1) {
      return [];
    }
    return this.slice(1, this.length);
  });
  _ap.__defineGetter__("head", function() {
    return this[0];
  });
  _ap.__defineGetter__("last", function() {
    return this[this.length - 1];
  });
  _ap.__defineGetter__("init", function() {
    return this.slice(0, this.length - 1);
  });
  _ap.__defineGetter__("empty", function() {
    return this.length === 0;
  });
  _ap.__defineGetter__("_reverse", function() {
    if (this.length === 0) {
      return [];
    }
    return this.clone.reverse();
  });
  _ap.__defineGetter__("rev", function() {
    return this._reverse;
  });
  _ap.add = _ap.append = function(a) {
    return this.concat(a);
  };
  _ap.fadd = function(a) {
    return (this.slice(0, 1)).add(a);
  };
  _ap.map = nativeMap || function(f) {
    if (this.empty) {
      return [];
    }
    return [f(this.head)].add(this.tail.map(f));
  };
  _ap.foldl = nativeFoldl || function(f, z) {
    if (!z && z !== 0) {
      throw "Foldl: no initial value specified";
    }
    if (this.empty) {
      return z;
    }
    return f(this.head, this.tail.foldl(f, z));
  };
  _ap.foldr = nativeFoldr || function(f, z) {
    if (!z && z !== 0) {
      throw "Foldr: no initial value specified";
    }
    return this._reverse.foldl(f, z);
  };
  _ap.__defineGetter__("and", function() {
    return this.foldr((function(a, b) {
      return a && b;
    }), true);
  });
  _ap.__defineGetter__("or", function() {
    return this.foldr((function(a, b) {
      return a || b;
    }), false);
  });
  _ap.__defineGetter__("sum", function() {
    var sum;
    sum = this.foldl((function(a, b) {
      return a + b;
    }), 0);
    if (sum === void 0) {
      return 0;
    }
    return sum;
  });
  _ap.__defineGetter__("product", function() {
    var product;
    product = this.foldl((function(a, b) {
      return a * b;
    }), 1);
    if (product === void 0) {
      return 0;
    }
    return product;
  });
  _ap.__defineGetter__("_concat", function() {
    return this.foldl((function(a, b) {
      return a.add(b);
    }), []);
  });
  _ap.__defineGetter__("conc", function() {
    return this._concat;
  });
  _ap.any = nativeAny || function(f) {
    return (this.map(f)).or;
  };
  _ap.all = nativeAll || function(f) {
    return (this.map(f)).and;
  };
  _ap.concatMap = function(f) {
    return this._concat.map(f);
  };
  _ap.__defineGetter__("maximum", function() {
    return this.maximumBy(function(a, b) {
      return a >= b;
    });
  });
  _ap.__defineGetter__("minimum", function() {
    return this.minimumBy(function(a, b) {
      return a <= b;
    });
  });
  _ap.insert = function(e) {
    return this.insertBy(e, function(a, b) {
      return e <= b;
    });
  };
  _ap._delete = _ap.del = function(e) {
    return this.deleteBy(e, function(a, b) {
      return e === b;
    });
  };
  _op.replicate = function(n) {
    if (n <= 0) {
      return [];
    }
    return [this].add(this.replicate(n - 1));
  };
  _ap.take = function(n) {
    if (n === 0 || this.empty) {
      return [];
    }
    return this.fadd(this.tail.take(n - 1));
  };
  _ap.drop = function(n) {
    if (n === 0 || this.empty) {
      return this;
    }
    return this.tail.drop(n - 1);
  };
  _ap.takeWhile = function(f) {
    if (this.empty) {
      return [];
    }
    if (f(this.head)) {
      return this.fadd(this.tail.takeWhile(f));
    }
    return [];
  };
  _ap.dropWhile = function(f) {
    if (this.empty) {
      return [];
    }
    if (f(this.head)) {
      return this.tail.dropWhile(f);
    }
    return this;
  };
  _ap.__defineGetter__("group", function() {
    return this.groupBy(function(a, b) {
      return a === b;
    });
  });
  _ap.elem = function(e) {
    return !(this.indexOf(e) === -1);
  };
  _ap.notElem = function(e) {
    return !this.elem(e);
  };
  _ap.find = function(f) {
    if (this.empty) {
      return null;
    }
    if (f(this.head)) {
      return this.head;
    }
    return this.tail.find(f);
  };
  _ap.filter = nativeFilter || function(f) {
    if (this.empty) {
      return [];
    }
    if (f(this.head)) {
      return this.fadd(this.tail.filter(f));
    }
    return this.tail.filter(f);
  };
  _ap.zip = function(ar) {
    if (this.empty || ar.empty) {
      return [];
    }
    return [[this.head, ar.head]].add(this.tail.zip(ar.tail));
  };
  _np.__defineGetter__("even", function() {
    return this % 2 === 0;
  });
  _np.__defineGetter__("odd", function() {
    return !this.even;
  });
  _ap.maximumBy = _ap.minimumBy = function(f) {
    if (this.empty) {
      return;
    }
    if (this.length === 1) {
      return this.head;
    }
    if (f(this.head, this.tail.maximumBy(f))) {
      return this.head;
    }
    return this.tail.maximumBy(f);
  };
  _ap.insertBy = function(e, f) {
    if (this.empty) {
      return [e];
    }
    if (f(e, this.head)) {
      return [e].add(this);
    }
    return this.fadd(this.tail.insertBy(e, f));
  };
  _ap.deleteBy = function(e, f) {
    if (this.empty) {
      return;
    }
    if (f(e, this.head)) {
      return this.tail;
    }
    return this.fadd(this.tail.deleteBy(e, f));
  };
  _ap.sortBy = function(f) {
    if (!nativeSort) {
      throw "sortBy: you're missing sort(), uppgrade!";
    }
    return this.clone.sort(f);
  };
  _ap.groupBy = function(f) {
    var e, n, o;
    if (this.empty) {
      return [];
    }
    if (this.length === 1) {
      return [[this.head]];
    }
    e = this.head;
    n = this.tail.takeWhile(function(a) {
      return f(a, e);
    });
    n = [e].add(n);
    o = this.drop(n.length);
    return [n].add(o.groupBy(f));
  };
}).call(this);
