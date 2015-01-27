var PassThrough = require('stream').PassThrough

  , collect = require('collect-stream')
  , hyperfast = require('hyperfast')
  , is = require('is-type')
  , isStream = require('is-stream')
  , runParallel = require('run-parallel-object')
  , writeOnly = require('write-only-stream')

    // basically clone the stream map and make functions use
    // standard node.js function (err, value) structure
  , fixStreamMap = function (obj) {
      if (isStream(obj)) return obj
      if (is.buffer(obj)) return obj
      if (is.function(obj)) { 
        return function (done) {
          done(null, obj)
        }
      }
      if (!is.object(obj)) return obj
      var copy = is.array(obj)? [] : {}

      Object.keys(obj).forEach(function (key) {
        copy[key] = fixStreamMap(obj[key])
      })

      return copy
    }

  , hyperbuffer = function (streamMap, callback) {
      var inputStream = new PassThrough()

      runParallel({
          input: function (done) {
            collect(inputStream, function (err, data) {
              if (err) return done(err)
              done(null, data.toString())
            })
          }
        , streamMap: fixStreamMap(streamMap)
      }, function (err, results) {
        if (err) return callback(err)

        callback(null, hyperfast(results.input, results.streamMap).innerHTML)
      })
      return writeOnly(inputStream)
    }

module.exports = hyperbuffer