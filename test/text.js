var hyperbuffer = require('../hyperbuffer');
var test = require('tape');

var through = require('through2');
var ent = require('ent');

test('string _text', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '.row': { _text: '<b>beep boop</b>' }
    }, function (err, body) {
        t.equal(
            body.toString('utf8'),
            '<div class="row">' + ent.encode('<b>beep boop</b>') + '</div>'
        );
    });
    hs.end('<div class="row"></div>');
});

test('stream _text', function (t) {
    t.plan(1);
    var stream = through();
    stream.push('<b>beep boop</b>');
    stream.push(null);
    
    var hs = hyperbuffer({
        '.row': { _text: stream }
    }, function (err, body) {
        t.equal(
            body.toString('utf8'),
            '<div class="row">' + ent.encode('<b>beep boop</b>') + '</div>'
        );
    });
    hs.end('<div class="row"></div>');
});
