var hyperbuffer = require('../hyperbuffer');
var test = require('tape');
var through = require('through2');

test('string _html', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '.row': { _html: '<b>beep boop</b>' }
    }, function (err, body) {
        t.equal(
            body.toString('utf8'),
            '<div class="row"><b>beep boop</b></div>'
        );
    });

    hs.end('<div class="row"></div>');
});

test('stream _html', function (t) {
    t.plan(1);
    var stream = through();
    stream.push('<b>beep boop</b>');
    stream.push(null);
    
    var hs = hyperbuffer({
        '.row': { _html: stream }
    }, function (err, body) {
        t.equal(
            body.toString('utf8'),
            '<div class="row"><b>beep boop</b></div>'
        );
    });
    hs.end('<div class="row"></div>');
});
