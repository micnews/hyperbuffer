var hyperbuffer = require('../hyperbuffer');
var test = require('tape');


test('null value', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '.row': null
    }, function (err, body) {
        t.equal(
            body.toString('utf8'),
            '<div class="row"></div>'
        );
    });
    hs.end('<div class="row"></div>');
});
