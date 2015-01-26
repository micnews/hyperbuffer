var test = require('tape');
var hyperbuffer = require('../hyperbuffer');

var src = '<div><input value=""><span></span></div>';
var expected = '<div><input value="value" /><span class="class"></span></div>';

test('attributes', function (t) {
    t.plan(1);
    var hs = hyperbuffer({
       input : { value : 'value' },
       span : { 'class': 'class' }
    }, function (err, html) {
        t.equal(html.toString(), expected);
    });
    hs.end(src);
});
