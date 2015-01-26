var test = require('tape');
var hyperbuffer = require('../hyperbuffer');

var fs = require('fs');
var expected = fs.readFileSync(__dirname + '/hs/expected.html', 'utf8');

test('glue html streams from disk', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '#a': fs.createReadStream(__dirname + '/hs/a.html'),
        '#b': fs.createReadStream(__dirname + '/hs/b.html')
    }, function (err, data) {
        t.equal(data, expected);
    });
    var rs = fs.createReadStream(__dirname + '/hs/index.html');
    
    rs.pipe(hs);
});
