(function() {
  var assert, dance, vows;
  vows = require('vows');
  assert = require('assert');
  dance = require('../dance');
  vows.describe('Object').addBatch({
    '.replicate()': {
      topic: 10,
      'will return an array with n element of object': function(topic) {
        return assert.deepEqual(topic.replicate(3), [topic, topic, topic]);
      }
    }
  }).run();
}).call(this);
