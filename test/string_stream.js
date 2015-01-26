var test = require('tape');
var through = require('through');
var hyperbuffer = require('../hyperbuffer');

test('string before a stream', function (t) {
    t.plan(1);
    var SIZE = 50;
    var stream = through();
    
    var hs = hyperbuffer({
        '.a': Array(SIZE).join('THEBEST'),
        '.b': stream
    }, function (err, src) {
        t.equal(src.toString(), [
            '<div class="a">' + Array(SIZE).join('THEBEST') + '</div>',
            '<div class="b">onetwothreefourfive</div>'
        ].join(''));
    });
    var rs = through();
    rs.pipe(hs)
    rs.queue('<div class="a"></div><div class="b"></div>');
    rs.queue(null);
    
    setTimeout(function () {
        stream.queue('one');
        stream.queue('two');
    }, 25);
    setTimeout(function () {
        stream.queue('three');
    }, 50);
    setTimeout(function () {
        stream.queue('four');
        stream.queue('five');
        stream.queue(null);
    }, 75);
});
