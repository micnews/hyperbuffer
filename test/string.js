var test = require('tape');
var through = require('through');
var hyperbuffer = require('../hyperbuffer');

var fs = require('fs');
var expected = fs.readFileSync(__dirname + '/string/expected.html', 'utf8');

test('glue html streams from disk', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '#a': fs.createReadStream(__dirname + '/string/a.html'),
        '#b': fs.createReadStream(__dirname + '/string/b.html'),
        'head title': 'beep boop',
        '#c span': function (html) { return html.toUpperCase() }
    }, function (err, data) {
        t.equal(data, expected);
    });
    var rs = fs.createReadStream(__dirname + '/string/index.html');
    
    rs.pipe(hs);
});
