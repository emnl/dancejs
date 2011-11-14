vows = require('vows')
assert = require('assert')
dance = require('../dance')

vows.describe('Number').addBatch({

  '.even': {
    topic: 10,
    'will return true if number is even': (topic) ->
      assert.deepEqual topic.even, true
  },

  '.odd': {
    topic: 5,
    'will return true if number is odd': (topic) ->
      assert.deepEqual topic.odd, true
  }

}).run()