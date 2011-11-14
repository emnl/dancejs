(function() {
  var assert, dance, vows;
  vows = require('vows');
  assert = require('assert');
  dance = require('../dance');
  vows.describe('Array').addBatch({
    '.head': {
      'with length > 0': {
        topic: [1, 2, 3],
        'will return the first element': function(topic) {
          return assert.deepEqual(topic.head, 1);
        }
      },
      'with no elements': {
        topic: [],
        'will return undefined': function(topic) {
          return assert.deepEqual(topic.head, void 0);
        }
      }
    },
    '.tail': {
      'with length > 0': {
        topic: [1, 2, 3],
        'will return all elements except the first': function(topic) {
          return assert.deepEqual(topic.tail, [2, 3]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an empty array': function(topic) {
          return assert.deepEqual(topic.tail, []);
        }
      }
    },
    '.last': {
      'with length > 0': {
        topic: [1, 2, 3],
        'will return the last element': function(topic) {
          return assert.deepEqual(topic.last, 3);
        }
      },
      'with no elements': {
        topic: [],
        'will return null': function(topic) {
          return assert.deepEqual(topic.last, void 0);
        }
      }
    },
    '.init': {
      'with length > 0': {
        topic: [1, 2, 3],
        'will return all elements except the last': function(topic) {
          return assert.deepEqual(topic.init, [1, 2]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an empty array': function(topic) {
          return assert.deepEqual(topic.init, []);
        }
      }
    },
    '.empty': {
      'with an empty array': {
        topic: [],
        'will return true': function(topic) {
          return assert.deepEqual(topic.empty, true);
        }
      },
      'with an array of length > 0': {
        topic: [1, 2, 3],
        'will return false': function(topic) {
          return assert.deepEqual(topic.empty, false);
        }
      }
    },
    '.add()': {
      'with length > 0': {
        topic: [1, 2, 3],
        'will add the new array to the old': function(topic) {
          return assert.deepEqual(topic.add([4, 5]), [1, 2, 3, 4, 5]);
        }
      },
      'with no elements': {
        topic: [],
        'will return the new array': function(topic) {
          return assert.deepEqual(topic.add([4, 5]), [4, 5]);
        }
      }
    },
    '.append()': {
      topic: [1, 2, 3],
      'will behave like add()': function(topic) {
        return assert.deepEqual(topic.append([4, 5]), topic.add([4, 5]));
      }
    },
    '.fadd()': {
      'with length > 0': {
        topic: [1, 2, 3],
        'will return the first element with the new array added': function(topic) {
          return assert.deepEqual(topic.fadd([4, 5]), [1, 4, 5]);
        }
      },
      'with no elements': {
        topic: [],
        'will return the new elements': function(topic) {
          return assert.deepEqual(topic.fadd([4, 5]), [4, 5]);
        }
      }
    },
    '.foldl()': {
      'with length > 0': {
        topic: [1, 2, 3],
        'will reduce left with function': function(topic) {
          var fold;
          fold = topic.foldl((function(a, b) {
            return a + b;
          }), 0);
          return assert.deepEqual(fold, 6);
        }
      },
      'with no elements': {
        topic: [],
        'will return initial value': function(topic) {
          var fold;
          fold = topic.foldl((function(a, b) {
            return a + b;
          }), 10);
          return assert.deepEqual(fold, 10);
        }
      }
    },
    '.foldr()': {
      'with length > 0': {
        topic: [1, 2, 3],
        'will reduce right with function': function(topic) {
          var fold;
          fold = topic.foldr((function(a, b) {
            return a + b;
          }), 0);
          return assert.deepEqual(fold, 6);
        }
      },
      'with no elements': {
        topic: [],
        'will return undefined': function(topic) {
          var fold;
          fold = topic.foldr((function(a, b) {
            return a + b;
          }), 10);
          return assert.deepEqual(fold, 10);
        }
      }
    },
    '.and': {
      'with only true elements': {
        topic: [true, true, true],
        'will return true': function(topic) {
          return assert.deepEqual(topic.and, true);
        }
      },
      'with one or more false element': {
        topic: [true, true, false, true],
        'will return false': function(topic) {
          return assert.deepEqual(topic.and, false);
        }
      }
    },
    '.or': {
      'with at least one true element': {
        topic: [false, false, true, false],
        'will return true': function(topic) {
          return assert.deepEqual(topic.or, true);
        }
      },
      'with no true elements': {
        topic: [false, false, false],
        'will return false': function(topic) {
          return assert.deepEqual(topic.or, false);
        }
      }
    },
    '.sum': {
      'with length > 0': {
        topic: [1, 2, 3],
        'will return foldl with addition': function(topic) {
          return assert.deepEqual(topic.sum, 6);
        }
      },
      'with no elements': {
        topic: [],
        'will return 0': function(topic) {
          return assert.deepEqual(topic.sum, 0);
        }
      }
    },
    '.product': {
      'with length > 0': {
        topic: [2, 3, 4],
        'will return foldl with multi': function(topic) {
          return assert.deepEqual(topic.product, 24);
        }
      },
      'with no elements': {
        topic: [],
        'will return 1': function(topic) {
          return assert.deepEqual(topic.product, 1);
        }
      }
    },
    '._concat': {
      'with length > 0': {
        topic: [1, 2, 3, [4, 5]],
        'will return the array flatten one level': function(topic) {
          return assert.deepEqual(topic._concat, [1, 2, 3, 4, 5]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an empty array': function(topic) {
          return assert.deepEqual(topic._concat, []);
        }
      }
    },
    '.conc': {
      topic: [1, 2, 3, [4, 5]],
      'will behave like _concat': function(topic) {
        return assert.deepEqual(topic.conc, topic._concat);
      }
    },
    '.any()': {
      'with length > 0': {
        topic: [1, 2, 3],
        'will return true if input function applies to any element': function(topic) {
          var any;
          any = topic.any((function(a) {
            return a === 3;
          }));
          return assert.deepEqual(any, true);
        }
      },
      'with no elements': {
        topic: [],
        'will always return false': function(topic) {
          var any;
          any = topic.any((function(a) {
            return a > 0;
          }));
          return assert.deepEqual(any, false);
        }
      }
    },
    '.all()': {
      'with length > 0': {
        topic: [1, 2, 3],
        'will return true if input function applies to all elements': function(topic) {
          var all;
          all = topic.all((function(a) {
            return a <= 3;
          }));
          return assert.deepEqual(all, true);
        }
      },
      'with no elements': {
        topic: [],
        'will always return true': function(topic) {
          var all;
          all = topic.all((function(a) {
            return a > 0;
          }));
          return assert.deepEqual(all, true);
        }
      }
    },
    '.concatMap()': {
      'with length > 0': {
        topic: [1, 2, 3, [4, 5]],
        'will concat the array then map all elements': function(topic) {
          var concmap;
          concmap = topic.concatMap((function(a) {
            return a + 1;
          }));
          return assert.deepEqual(concmap, [2, 3, 4, 5, 6]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an empty array': function(topic) {
          var concmap;
          concmap = topic.concatMap((function(a) {
            return a + 1;
          }));
          return assert.deepEqual(concmap, []);
        }
      }
    },
    '.take()': {
      'with length > 0': {
        topic: [1, 2, 3, 4],
        'will return n of the first elements': function(topic) {
          return assert.deepEqual(topic.take(2), [1, 2]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an empty array': function(topic) {
          return assert.deepEqual(topic.take(2), []);
        }
      }
    },
    '.drop()': {
      'with length > 0': {
        topic: [1, 2, 3, 4],
        'will delete the n first elements': function(topic) {
          return assert.deepEqual(topic.drop(3), [4]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an empty array': function(topic) {
          return assert.deepEqual(topic.drop(2), []);
        }
      }
    },
    '.takeWhile()': {
      'with length > 0': {
        topic: [1, 2, 3, 4],
        'will take elements while input function is true': function(topic) {
          var takew;
          takew = topic.takeWhile((function(a) {
            return a < 3;
          }));
          return assert.deepEqual(takew, [1, 2]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an empty array': function(topic) {
          var takew;
          takew = topic.takeWhile((function(a) {
            return a < 3;
          }));
          return assert.deepEqual(takew, []);
        }
      }
    },
    '.dropWhile()': {
      'with length > 0': {
        topic: [1, 2, 3, 4],
        'will drop elements while input function is true': function(topic) {
          var dropw;
          dropw = topic.dropWhile((function(a) {
            return a < 3;
          }));
          return assert.deepEqual(dropw, [3, 4]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an empty array': function(topic) {
          var dropw;
          dropw = topic.dropWhile((function(a) {
            return a < 3;
          }));
          return assert.deepEqual(dropw, []);
        }
      }
    },
    '.elem()': {
      'with length > 0': {
        topic: [1, 2, 3, 4],
        'will return true if element is part of the array': function(topic) {
          return assert.deepEqual(topic.elem(3), true);
        }
      },
      'with no elements': {
        topic: [],
        'will return false': function(topic) {
          return assert.deepEqual(topic.elem(0), false);
        }
      }
    },
    '.notElem()': {
      'with length > 0': {
        topic: [1, 2, 3, 4],
        'will return true if element is not part of the array': function(topic) {
          return assert.deepEqual(topic.notElem(5), true);
        }
      },
      'with no elements': {
        topic: [],
        'will return true': function(topic) {
          return assert.deepEqual(topic.notElem(0), true);
        }
      }
    },
    '.zip()': {
      'with length > 0': {
        topic: [1, 2, 3],
        'will combine array with another array, and dispose leftover elements': function(topic) {
          return assert.deepEqual(topic.zip(["hey", "hello"]), [[1, "hey"], [2, "hello"]]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an empty array': function(topic) {
          return assert.deepEqual(topic.zip([4]), []);
        }
      }
    },
    '._reverse': {
      'with length > 0': {
        topic: [1, 2, 3],
        'will return a new array reversed': function(topic) {
          return assert.deepEqual(topic._reverse, [3, 2, 1]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an empty array': function(topic) {
          return assert.deepEqual(topic._reverse, []);
        }
      }
    },
    '.rev': {
      topic: [1, 2, 3],
      'will behave like _reverse': function(topic) {
        return assert.deepEqual(topic.rev, topic._reverse);
      }
    },
    '.maximumBy()': {
      'with length > 0': {
        topic: [1, 2, 3],
        'will return the maximum element decided by input function': function(topic) {
          var maxi;
          maxi = topic.maximumBy((function(a, b) {
            return a > b;
          }));
          return assert.deepEqual(maxi, 3);
        }
      },
      'with no elements': {
        topic: [],
        'will return undefined': function(topic) {
          var maxi;
          maxi = topic.maximumBy((function(a, b) {
            return a > b;
          }));
          return assert.deepEqual(maxi, void 0);
        }
      }
    },
    '.minimumBy()': {
      'with length > 0': {
        topic: [3, 2, 1],
        'will return the minimum element decided by input function': function(topic) {
          var mini;
          mini = topic.minimumBy((function(a, b) {
            return a < b;
          }));
          return assert.deepEqual(mini, 1);
        }
      },
      'with no elements': {
        topic: [],
        'will return undefined': function(topic) {
          var mini;
          mini = topic.minimumBy((function(a, b) {
            return a < b;
          }));
          return assert.deepEqual(mini, void 0);
        }
      }
    },
    '.maximum': {
      'with length > 0': {
        topic: [1, 2, 3, 10, 20, 5],
        'will return the maximum element': function(topic) {
          return assert.deepEqual(topic.maximum, 20);
        }
      },
      'with no elements': {
        topic: [],
        'will return undefined': function(topic) {
          return assert.deepEqual(topic.maximum, void 0);
        }
      }
    },
    '.minimum': {
      'with length > 0': {
        topic: [1, 2, 3, -2, 10, 20, 5],
        'will return the minimum element': function(topic) {
          return assert.deepEqual(topic.minimum, -2);
        }
      },
      'with no elements': {
        topic: [],
        'will return undefined': function(topic) {
          return assert.deepEqual(topic.minimum, void 0);
        }
      }
    },
    '.insertBy()': {
      'with length > 0': {
        topic: [1, 2, 3, 4, 5],
        'will return an array with element inserted depending on f': function(topic) {
          var ins;
          ins = topic.insertBy(1, (function(a, b) {
            return b > 4;
          }));
          return assert.deepEqual(ins, [1, 2, 3, 4, 1, 5]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an array with the element': function(topic) {
          var ins;
          ins = topic.insertBy(1, (function(a, b) {
            return a > b;
          }));
          return assert.deepEqual(ins, [1]);
        }
      }
    },
    '.insert()': {
      'with length > 0': {
        topic: [1, 2, 3, 4],
        'will return an array with the element inserted': function(topic) {
          return assert.deepEqual(topic.insert(3), [1, 2, 3, 3, 4]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an array with the element': function(topic) {
          return assert.deepEqual(topic.insert(3), [3]);
        }
      }
    },
    '.deleteBy()': {
      'with length > 0': {
        topic: [1, 2, 3, 4, 5],
        'will return an array with first occurrence element deleted depending on f': function(topic) {
          var del;
          del = topic.deleteBy(1, (function(a, b) {
            return a === b - 2;
          }));
          return assert.deepEqual(del, [1, 2, 4, 5]);
        }
      },
      'with no elements': {
        topic: [],
        'will return undefined': function(topic) {
          var del;
          del = topic.deleteBy(1, (function(a, b) {
            return a === b - 1;
          }));
          return assert.deepEqual(del, void 0);
        }
      }
    },
    '.del': {
      'with length > 0': {
        topic: [1, 2, 3, 4],
        'will return an array with first occurrence element deleted': function(topic) {
          return assert.deepEqual(topic.del(2), [1, 3, 4]);
        }
      },
      'with no elements': {
        topic: [],
        'will return undefined': function(topic) {
          return assert.deepEqual(topic.del(2), void 0);
        }
      }
    },
    '.map()': {
      'with length > 0': {
        topic: [1, 2, 3, 4],
        'applies the input function on all elements in array': function(topic) {
          var mape;
          mape = topic.map((function(a) {
            return a + 10;
          }));
          return assert.deepEqual(mape, [11, 12, 13, 14]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an empty array': function(topic) {
          var mape;
          mape = topic.map((function(a) {
            return a + 10;
          }));
          return assert.deepEqual(mape, []);
        }
      }
    },
    '.filter()': {
      'with length > 0': {
        topic: [1, 2, 3, 4],
        'returns an array with the elements which fulfill function': function(topic) {
          var filt;
          filt = topic.filter((function(a) {
            return a > 2;
          }));
          return assert.deepEqual(filt, [3, 4]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an empty array': function(topic) {
          var filt;
          filt = topic.filter((function(a) {
            return a > 2;
          }));
          return assert.deepEqual(filt, []);
        }
      }
    },
    '.find()': {
      'with length > 0': {
        topic: [1, 2, 3, 4],
        'returns the first array which fulfill the function': function(topic) {
          var find;
          find = topic.find((function(a) {
            return a > 2;
          }));
          return assert.deepEqual(find, 3);
        }
      },
      'with no elements': {
        topic: [],
        'will return null': function(topic) {
          var find;
          find = topic.find((function(a) {
            return a > 2;
          }));
          return assert.deepEqual(find, null);
        }
      }
    },
    '.sortBy()': {
      'with length > 0': {
        topic: [4, 3, 2, 1],
        'returns the array sorted': function(topic) {
          var sorting;
          sorting = topic.sortBy((function(a, b) {
            return a - b;
          }));
          return assert.deepEqual(sorting, [1, 2, 3, 4]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an empty array': function(topic) {
          var sorting;
          sorting = topic.sortBy((function(a, b) {
            return a - b;
          }));
          return assert.deepEqual(sorting, []);
        }
      }
    },
    '.groupBy()': {
      'with length > 0': {
        topic: [2, 1, 2, 1, 4, 5, 4, 3, 2, 1],
        'returns the array with elements grouped by the function': function(topic) {
          var groups;
          groups = topic.groupBy((function(a, b) {
            return a < b;
          }));
          return assert.deepEqual(groups, [[2, 1], [2, 1], [4], [5, 4, 3, 2, 1]]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an empty array': function(topic) {
          var groups;
          groups = topic.groupBy((function(a, b) {
            return a === b;
          }));
          return assert.deepEqual(groups, []);
        }
      }
    },
    '.group': {
      'with length > 0': {
        topic: [1, 1, 2, 2, 3, 3, 4],
        'returns array.groupBy with ==': function(topic) {
          return assert.deepEqual(topic.group, [[1, 1], [2, 2], [3, 3], [4]]);
        }
      },
      'with no elements': {
        topic: [],
        'will return an empty array': function(topic) {
          return assert.deepEqual(topic.group, []);
        }
      }
    }
  }).run();
}).call(this);
