var test = require('tape');
var hyperbuffer = require('../hyperbuffer');
var Stream = require('stream');

var fs = require('fs');
var expected = fs.readFileSync(__dirname + '/az/expected.html', 'utf8');

test('fs stream and a slow stream', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '#a': createAzStream(),
        '#b': fs.createReadStream(__dirname + '/az/b.html')
    }, function (err, data) {
        if (err) return t.end(err);
        t.equal(data, expected);
    });

    var rs = fs.createReadStream(__dirname + '/az/index.html');
    rs.pipe(hs);
});

function createAzStream () {
    var rs = new Stream;
    rs.readable = true;
    var ix = 0;
    var iv = setInterval(function () {
        rs.emit('data', String.fromCharCode(97+ix));
        if (++ix === 26) {
            clearInterval(iv);
            rs.emit('end');
        }
    }, 25);
    return rs;
}
