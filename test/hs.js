var test = require('tap').test;
var through = require('through');
var hyperstream = require('../');

var fs = require('fs');
var expected = fs.readFileSync(__dirname + '/hs/expected.html', 'utf8');

test('glue html streams from disk', function (t) {
    t.plan(1);
    
    var hs = hyperstream({
        '#a': fs.createReadStream(__dirname + '/hs/a.html'),
        '#b': fs.createReadStream(__dirname + '/hs/b.html')
    });
    var rs = fs.createReadStream(__dirname + '/hs/index.html');
    
    var data = '';
    rs.pipe(hs).pipe(through(write, end));
    
    function write (buf) { data += buf }
    
    function end () {
        t.equal(data, expected);
    }
});
