var test = require('tap').test;
var hyperstream = require('../');
var Stream = require('stream');

var fs = require('fs');
var expected = fs.readFileSync(__dirname + '/az/expected.html', 'utf8');

test('fs stream and a slow stream', function (t) {
    t.plan(1);
    
    var hs = hyperstream({
        '#a': createAzStream(),
        '#b': fs.createReadStream(__dirname + '/az/b.html')
    });
    var data = '';
    hs.on('data', function (buf) { data += buf });
    hs.on('end', function () {
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
