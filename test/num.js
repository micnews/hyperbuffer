var test = require('tape');
var through = require('through');
var hyperbuffer = require('../hyperbuffer');

var fs = require('fs');
var expected = fs.readFileSync(__dirname + '/num/expected.html', 'utf8');

test('num', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '#a': 5,
        '#b': 6,
        '#c': { n: 123 },
        '#c span': function (html) { return html.length }
    }, function (err, data) {
        t.equal(data, expected);
    });
    var rs = fs.createReadStream(__dirname + '/num/index.html');
    
    rs.pipe(hs);
});
