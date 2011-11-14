vows = require('vows')
assert = require('assert')
dance = require('../dance')

vows.describe('Array').addBatch({

    '.head': {
      'with length > 0': {
        topic: [1,2,3],
        'will return the first element': (topic) ->
          assert.deepEqual topic.head, 1
      },
      'with no elements': {
        topic: [],
        'will return undefined': (topic) ->
          assert.deepEqual topic.head, undefined
      }
    },

    '.tail': {
      'with length > 0': {
        topic: [1,2,3],
        'will return all elements except the first': (topic) ->
          assert.deepEqual topic.tail, [2,3]
      },
      'with no elements': {
        topic: [],
        'will return an empty array': (topic) ->
          assert.deepEqual topic.tail, []
      }
    },

    '.last': {
      'with length > 0': {
        topic: [1,2,3],
        'will return the last element': (topic) ->
          assert.deepEqual topic.last, 3
      },
      'with no elements': {
        topic: [],
        'will return null': (topic) ->
          assert.deepEqual topic.last, undefined
      }
    },

    '.init': {
      'with length > 0': {
        topic: [1,2,3],
        'will return all elements except the last': (topic) ->
          assert.deepEqual topic.init, [1,2]
      },
      'with no elements': {
        topic: [],
        'will return an empty array': (topic) ->
          assert.deepEqual topic.init, []
      }
    },

    '.empty': {
      'with an empty array': {
        topic: [],
        'will return true': (topic) ->
          assert.deepEqual topic.empty, true
      },
      'with an array of length > 0': {
        topic: [1,2,3],
        'will return false': (topic) ->
          assert.deepEqual topic.empty, false
      }
    },

    '.add()': {
      'with length > 0': {
        topic: [1,2,3],
        'will add the new array to the old': (topic) ->
          assert.deepEqual topic.add([4,5]), [1,2,3,4,5]
      },
      'with no elements': {
        topic: [],
        'will return the new array': (topic) ->
          assert.deepEqual topic.add([4,5]), [4,5]
      }
    },

    '.append()': {
      topic: [1,2,3],
      'will behave like add()': (topic) ->
        assert.deepEqual topic.append([4,5]), topic.add([4,5])
    },

    '.fadd()': {
      'with length > 0': {
        topic: [1,2,3],
        'will return the first element with the new array added': (topic) ->
          assert.deepEqual topic.fadd([4,5]), [1,4,5]
      },
      'with no elements': {
        topic: [],
        'will return the new elements': (topic) ->
          assert.deepEqual topic.fadd([4,5]), [4,5]
      }
    },

    '.foldl()': {
      'with length > 0': {
        topic: [1,2,3],
        'will reduce left with function': (topic) ->
          fold = topic.foldl ((a,b) -> a + b), 0
          assert.deepEqual fold, 6
      },
      'with no elements': {
        topic: [],
        'will return initial value': (topic) ->
          fold = topic.foldl ((a,b) -> a + b), 10
          assert.deepEqual fold, 10
      }
    },

    '.foldr()': {
      'with length > 0': {
        topic: [1,2,3],
        'will reduce right with function': (topic) ->
          fold = topic.foldr ((a,b) -> a + b), 0
          assert.deepEqual fold, 6
      },
      'with no elements': {
        topic: [],
        'will return undefined': (topic) ->
          fold = topic.foldr ((a,b) -> a + b), 10
          assert.deepEqual fold, 10
      }
    },

    '.and': {
      'with only true elements': {
        topic: [true,true,true],
        'will return true': (topic) ->
          assert.deepEqual topic.and, true
      },
      'with one or more false element': {
        topic: [true,true,false,true],
        'will return false': (topic) ->
          assert.deepEqual topic.and, false
      }
    },

    '.or': {
      'with at least one true element': {
        topic: [false,false,true,false],
        'will return true': (topic) ->
          assert.deepEqual topic.or, true
      },
      'with no true elements': {
        topic: [false,false,false],
        'will return false': (topic) ->
          assert.deepEqual topic.or, false
      }
    },

    '.sum': {
      'with length > 0': {
        topic: [1,2,3],
        'will return foldl with addition': (topic) ->
          assert.deepEqual topic.sum, 6
      },
      'with no elements': {
        topic: [],
        'will return 0': (topic) ->
          assert.deepEqual topic.sum, 0
      }
    },

    '.product': {
      'with length > 0': {
        topic: [2,3,4],
        'will return foldl with multi': (topic) ->
          assert.deepEqual topic.product, 24
      },
      'with no elements': {
        topic: [],
        'will return 1': (topic) ->
          assert.deepEqual topic.product, 1
      }
    },

    '._concat': {
      'with length > 0': {
        topic: [1,2,3,[4,5]],
        'will return the array flatten one level': (topic) ->
          assert.deepEqual topic._concat, [1,2,3,4,5]
      },
      'with no elements': {
        topic: [],
        'will return an empty array': (topic) ->
          assert.deepEqual topic._concat, []
      }
    },

    '.conc': {
      topic: [1,2,3,[4,5]],
      'will behave like _concat': (topic) ->
        assert.deepEqual topic.conc, topic._concat
    },

    '.any()': {
      'with length > 0': {
        topic: [1,2,3],
        'will return true if input function applies to any element': (topic) ->
          any = topic.any ((a) -> a == 3)
          assert.deepEqual any, true
      },
      'with no elements': {
        topic: [],
        'will always return false': (topic) ->
          any = topic.any ((a) -> a > 0)
          assert.deepEqual any, false
      }
    },

    '.all()': {
      'with length > 0': {
        topic: [1,2,3],
        'will return true if input function applies to all elements': (topic) ->
          all = topic.all ((a) -> a <= 3)
          assert.deepEqual all, true
      },
      'with no elements': {
        topic: [],
        'will always return true': (topic) ->
          all = topic.all ((a) -> a > 0)
          assert.deepEqual all, true
      }
    },

    '.concatMap()': {
      'with length > 0': {
        topic: [1,2,3,[4,5]],
        'will concat the array then map all elements': (topic) ->
          concmap = topic.concatMap ((a) -> a + 1)
          assert.deepEqual concmap, [2,3,4,5,6]
      },
      'with no elements': {
        topic: [],
        'will return an empty array': (topic) ->
          concmap = topic.concatMap ((a) -> a + 1)
          assert.deepEqual concmap, []
      }
    },

    '.take()': {
      'with length > 0': {
        topic: [1,2,3,4],
        'will return n of the first elements': (topic) ->
          assert.deepEqual topic.take(2), [1,2]
      },
      'with no elements': {
        topic: [],
        'will return an empty array': (topic) ->
          assert.deepEqual topic.take(2), []
      }
    },

    '.drop()': {
      'with length > 0': {
        topic: [1,2,3,4],
        'will delete the n first elements': (topic) ->
          assert.deepEqual topic.drop(3), [4]
      },
      'with no elements': {
        topic: [],
        'will return an empty array': (topic) ->
          assert.deepEqual topic.drop(2), []
      }
    },

    '.takeWhile()': {
      'with length > 0': {
        topic: [1,2,3,4],
        'will take elements while input function is true': (topic) ->
          takew = topic.takeWhile ((a) -> a < 3)
          assert.deepEqual takew, [1,2]
      },
      'with no elements': {
        topic: [],
        'will return an empty array': (topic) ->
          takew = topic.takeWhile ((a) -> a < 3)
          assert.deepEqual takew, []
      }
    },

    '.dropWhile()': {
      'with length > 0': {
        topic: [1,2,3,4],
        'will drop elements while input function is true': (topic) ->
          dropw = topic.dropWhile ((a) -> a < 3)
          assert.deepEqual dropw, [3,4]
      },
      'with no elements': {
        topic: [],
        'will return an empty array': (topic) ->
          dropw = topic.dropWhile ((a) -> a < 3)
          assert.deepEqual dropw, []
      }
    },

    '.elem()': {
      'with length > 0': {
        topic: [1,2,3,4],
        'will return true if element is part of the array': (topic) ->
          assert.deepEqual topic.elem(3), true
      },
      'with no elements': {
        topic: [],
        'will return false': (topic) ->
          assert.deepEqual topic.elem(0), false
      }
    },

    '.notElem()': {
      'with length > 0': {
        topic: [1,2,3,4],
        'will return true if element is not part of the array': (topic) ->
          assert.deepEqual topic.notElem(5), true
      },
      'with no elements': {
        topic: [],
        'will return true': (topic) ->
          assert.deepEqual topic.notElem(0), true
      }
    },

    '.zip()': {
      'with length > 0': {
        topic: [1,2,3],
        'will combine array with another array, and dispose leftover elements': (topic) ->
          assert.deepEqual topic.zip(["hey","hello"]), [[1,"hey"],[2,"hello"]]
      },
      'with no elements': {
        topic: [],
        'will return an empty array': (topic) ->
          assert.deepEqual topic.zip([4]), []
      }
    },

    '._reverse': {
      'with length > 0': {
        topic: [1,2,3],
        'will return a new array reversed': (topic) ->
          assert.deepEqual topic._reverse, [3,2,1]
      },
      'with no elements': {
        topic: [],
        'will return an empty array': (topic) ->
          assert.deepEqual topic._reverse, []
      }
    },

    '.rev': {
      topic: [1,2,3],
      'will behave like _reverse': (topic) ->
        assert.deepEqual topic.rev, topic._reverse
    },

    '.maximumBy()': {
      'with length > 0': {
        topic: [1,2,3],
        'will return the maximum element decided by input function': (topic) ->
          maxi = topic.maximumBy ((a,b) -> a > b)
          assert.deepEqual maxi, 3
      },
      'with no elements': {
        topic: [],
        'will return undefined': (topic) ->
          maxi = topic.maximumBy ((a,b) -> a > b)
          assert.deepEqual maxi, undefined
      }
    },

    '.minimumBy()': {
      'with length > 0': {
        topic: [3,2,1],
        'will return the minimum element decided by input function': (topic) ->
          mini = topic.minimumBy ((a,b) -> a < b)

          assert.deepEqual mini, 1
      },
      'with no elements': {
        topic: [],
        'will return undefined': (topic) ->
          mini = topic.minimumBy ((a,b) -> a < b)
          assert.deepEqual mini, undefined
      }
    },

    '.maximum': {
      'with length > 0': {
        topic: [1,2,3,10,20,5],
        'will return the maximum element': (topic) ->
          assert.deepEqual topic.maximum, 20
      },
      'with no elements': {
        topic: [],
        'will return undefined': (topic) ->
          assert.deepEqual topic.maximum, undefined
      }
    },

    '.minimum': {
      'with length > 0': {
        topic: [1,2,3,-2,10,20,5],
        'will return the minimum element': (topic) ->
          assert.deepEqual topic.minimum, -2
      },
      'with no elements': {
        topic: [],
        'will return undefined': (topic) ->
          assert.deepEqual topic.minimum, undefined
      }
    },

    '.insertBy()': {
      'with length > 0': {
        topic: [1,2,3,4,5],
        'will return an array with element inserted depending on f': (topic) ->
          ins = topic.insertBy 1, ((a,b) -> b > 4)
          assert.deepEqual ins, [1,2,3,4,1,5]
      },
      'with no elements': {
        topic: [],
        'will return an array with the element': (topic) ->
          ins = topic.insertBy 1, ((a,b) -> a > b)
          assert.deepEqual ins, [1]
      }
    },

    '.insert()': {
      'with length > 0': {
        topic: [1,2,3,4],
        'will return an array with the element inserted': (topic) ->
          assert.deepEqual topic.insert(3), [1,2,3,3,4]
      },
      'with no elements': {
        topic: [],
        'will return an array with the element': (topic) ->
          assert.deepEqual topic.insert(3), [3]
      }
    },

    '.deleteBy()': {
      'with length > 0': {
        topic: [1,2,3,4,5],
        'will return an array with first occurrence element deleted depending on f': (topic) ->
          del = topic.deleteBy 1, ((a,b) -> a == b-2)
          assert.deepEqual del, [1,2,4,5]
      },
      'with no elements': {
        topic: [],
        'will return undefined': (topic) ->
          del = topic.deleteBy 1, ((a,b) -> a == b-1)
          assert.deepEqual del, undefined
      }
    },

    '.del': {
      'with length > 0': {
        topic: [1,2,3,4],
        'will return an array with first occurrence element deleted': (topic) ->
          assert.deepEqual topic.del(2), [1,3,4]
      },
      'with no elements': {
        topic: [],
        'will return undefined': (topic) ->
          assert.deepEqual topic.del(2), undefined
      }
    },

    '.map()': {
      'with length > 0': {
        topic: [1,2,3,4],
        'applies the input function on all elements in array': (topic) ->
          mape = topic.map ((a) -> a+10)
          assert.deepEqual mape, [11,12,13,14]
      },
      'with no elements': {
        topic: [],
        'will return an empty array': (topic) ->
          mape = topic.map ((a) -> a+10)
          assert.deepEqual mape, []
      }
    },

    '.filter()': {
      'with length > 0': {
        topic: [1,2,3,4],
        'returns an array with the elements which fulfill function': (topic) ->
          filt = topic.filter ((a) -> a > 2)
          assert.deepEqual filt, [3,4]
      },
      'with no elements': {
        topic: [],
        'will return an empty array': (topic) ->
          filt = topic.filter ((a) -> a > 2)
          assert.deepEqual filt, []
      }
    },

    '.find()': {
      'with length > 0': {
        topic: [1,2,3,4],
        'returns the first array which fulfill the function': (topic) ->
          find = topic.find ((a) -> a > 2)
          assert.deepEqual find, 3
      },
      'with no elements': {
        topic: [],
        'will return null': (topic) ->
          find = topic.find ((a) -> a > 2)
          assert.deepEqual find, null
      }
    },

    '.sortBy()': {
      'with length > 0': {
        topic: [4,3,2,1],
        'returns the array sorted': (topic) ->
          sorting = topic.sortBy ((a,b) -> a-b)
          assert.deepEqual sorting, [1,2,3,4]
      },
      'with no elements': {
        topic: [],
        'will return an empty array': (topic) ->
          sorting = topic.sortBy ((a,b) -> a-b)
          assert.deepEqual sorting, []
      }
    },

    '.groupBy()': {
      'with length > 0': {
        topic: [2,1,2,1,4,5,4,3,2,1],
        'returns the array with elements grouped by the function': (topic) ->
          groups = topic.groupBy ((a,b) -> a < b)
          assert.deepEqual groups, [[2,1],[2,1],[4],[5,4,3,2,1]]
      },
      'with no elements': {
        topic: [],
        'will return an empty array': (topic) ->
          groups = topic.groupBy ((a,b) -> a == b)
          assert.deepEqual groups, []
      }
    },

    '.group': {
      'with length > 0': {
        topic: [1,1,2,2,3,3,4],
        'returns array.groupBy with ==': (topic) ->
          assert.deepEqual topic.group, [[1,1],[2,2],[3,3],[4]]
      },
      'with no elements': {
        topic: [],
        'will return an empty array': (topic) ->
          assert.deepEqual topic.group, []
      }
    }

  }).run()