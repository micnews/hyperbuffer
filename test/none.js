var test = require('tape');
var through = require('through');
var hyperbuffer = require('../hyperbuffer');

var fs = require('fs');
var expected = fs.readFileSync(__dirname + '/none/index.html', 'utf8');

test('glue html streams from disk', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({}, function (err, data) {
        t.equal(data, expected);
    });
    var rs = fs.createReadStream(__dirname + '/none/index.html');
    
    rs.pipe(hs)
});
