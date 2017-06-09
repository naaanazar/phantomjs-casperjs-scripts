/**
 * Created by naaanazar on 09.06.2017.
 */
var casper = require('casper').create();

casper.start('http://google.com', function() {
    if (this.exists('title')) {
        this.echo('the heading exists');
        var fs = require('fs');
        fs.write('save/title.txt', this.getTitle(), 'w');
    }
});

casper.run();