var hyperbuffer = require('../hyperbuffer');
var test = require('tape');
var ent = require('ent');

test('append implicit text', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '.row': { _append: '<b>wow</b>' }
    }, function (err, body) {
        if (err) return t.end(err);
        t.equal(
            body.toString('utf8'),
            '<div class="row">so ' + ent.encode('<b>wow</b>') + '</div>'
        );
    });
    hs.end('<div class="row">so </div>');
});

test('append text', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '.row': { _appendText: '<b>wow</b>' }
    }, function (err, body) {
        if (err) return t.end(err);
        t.equal(
            body.toString('utf8'),
            '<div class="row">so ' + ent.encode('<b>wow</b>') + '</div>'
        );
    });
    hs.end('<div class="row">so </div>');
});

test('append html', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '.row': { _appendHtml: '<b>wow</b>' }
    }, function (err, body) {
        if (err) return t.end(err);
        t.equal(
            body.toString('utf8'),
            '<div class="row">so <b>wow</b></div>'
        );
    });
    hs.end('<div class="row">so </div>');
});

test('append implicit text pre-existing markup', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '.row': { _append: '<b>wow</b>' }
    }, function (err, body) {
        if (err) return t.end(err);
        t.equal(
            body.toString('utf8'),
            '<div class="row"><i>so</i> ' + ent.encode('<b>wow</b>') + '</div>'
        );
    });
    hs.end('<div class="row"><i>so</i> </div>');
});

test('append text pre-existing markup', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '.row': { _appendText: '<b>wow</b>' }
    }, function (err, body) {
        if (err) return t.end(err);
        t.equal(
            body.toString('utf8'),
            '<div class="row"><i>so</i> ' + ent.encode('<b>wow</b>') + '</div>'
        );
    });
    hs.end('<div class="row"><i>so</i> </div>');
});

test('append html pre-existing markup', function (t) {
    t.plan(1);
    
    var hs = hyperbuffer({
        '.row': { _appendHtml: '<b>wow</b>' }
    }, function (err, body) {
        if (err) return t.end(err);
        t.equal(
            body.toString('utf8'),
            '<div class="row"><i>so</i> <b>wow</b></div>'
        );
    });
    hs.end('<div class="row"><i>so</i> </div>');
});
