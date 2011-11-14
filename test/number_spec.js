(function() {
  var assert, dance, vows;
  vows = require('vows');
  assert = require('assert');
  dance = require('../dance');
  vows.describe('Number').addBatch({
    '.even': {
      topic: 10,
      'will return true if number is even': function(topic) {
        return assert.deepEqual(topic.even, true);
      }
    },
    '.odd': {
      topic: 5,
      'will return true if number is odd': function(topic) {
        return assert.deepEqual(topic.odd, true);
      }
    }
  }).run();
}).call(this);
