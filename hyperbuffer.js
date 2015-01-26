var PassThrough = require('stream').PassThrough

  , collect = require('collect-stream')
  , hyperfast = require('hyperfast')
  , runParallel = require('run-parallel-object')
  , writeOnly = require('write-only-stream')

  , hyperbuffer = function (streamMap, callback) {
      var inputStream = new PassThrough()

      runParallel({
          input: function (done) {
            collect(inputStream, function (err, data) {
              if (err) return done(err)
              done(null, data.toString())
            })
          }
        , streamMap: streamMap
      }, function (err, results) {
        if (err) return callback(err)

        callback(null, hyperfast(results.input, results.streamMap).innerHTML)
      })
      return writeOnly(inputStream)
    }

module.exports = hyperbuffer