var hyperbuffer = require('../hyperbuffer');
var test = require('tape');
var ent = require('ent');

test('append property', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '.row': { 'class': { append: ' post' } }
    }, function (err, body) {
        if (err) return t.end(err)
        t.equal(
            body.toString('utf8'),
            '<div class="row post">so </div>'
        );
    });
    hs.end('<div class="row">so </div>');
});

test('prepend property', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '.row': { 'class': { prepend: 'pre ' } }
    }, function (err, body) {
        if (err) return t.end(err)
        t.equal(
            body.toString('utf8'),
            '<div class="pre row">so </div>'
        );
    });
    hs.end('<div class="row">so </div>');
});

test('append and prepend property', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '.row': { 'class': { prepend: 'pre ', append: ' post' } }
    }, function (err, body) {
        if (err) return t.end(err)
        t.equal(
            body.toString('utf8'),
            '<div class="pre row post">so </div>'
        );
    });
    hs.end('<div class="row">so </div>');
});

test('append and prepend empty property', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        'div': { 'class': { prepend: 'pre ', append: ' post' } }
    }, function (err, body) {
        if (err) return t.end(err)
        t.equal(
            body.toString('utf8'),
            '<div class="pre  post">so </div>'
        );
    });
    hs.end('<div>so </div>');
});

test('append property with empty string', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        'div': { 'class': { append: '' } }
    }, function (err, body) {
        if (err) return t.end(err)
        t.equal(
            body.toString('utf8'),
            '<div class="row">so </div>'
        );
    });
    hs.end('<div class="row">so </div>');
});

