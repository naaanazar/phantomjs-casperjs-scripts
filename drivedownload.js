
var source = [
    'https://drive.google.com/file/d/0B6PQ0TGITfUZUDdPX25PQ1F2TDg/view?usp=sharing',
    'https://drive.google.com/file/d/0B6PQ0TGITfUZUDFWalBVQVhMTGc/view?usp=sharing',
    'https://drive.google.com/file/d/0B6PQ0TGITfUZUkJsd0VvRVo4cnM/view?usp=sharing',
    'https://drive.google.com/file/d/0B6PQ0TGITfUZbHdqWTMxUXM1SDA/view?usp=sharing',
    'https://drive.google.com/file/d/0B6PQ0TGITfUZRVhaWDhycW0tNEU/view?usp=sharing',
    'https://drive.google.com/file/d/0B6PQ0TGITfUZZlcyeU5CS3JZVUk/view?usp=sharing',
    'https://drive.google.com/file/d/0B6PQ0TGITfUZRm50WkZWR3paVTA/view?usp=sharing',
    'https://drive.google.com/file/d/0B6PQ0TGITfUZRzVrcVpWTm5KMlk/view?usp=sharing',
    'https://drive.google.com/file/d/0B6PQ0TGITfUZS3lpMkVPeWIweEE/view?usp=sharing',
    'https://drive.google.com/file/d/0B6PQ0TGITfUZUVp0RW14ZTNhUlk/view?usp=sharing'
];

var links = [];
var result = [];
var countF = 0;



casper = require('casper').create({
    logLevel: "info",              // Only "info" level messages will be logged
    verbose: true                  // log messages will be printed out to the console
});

casper.start();




casper.each(source, function(self, link, i) {


    // casper.wait(1000, function() {
    console.log(i + '----'  + link);
    var fileLink = parseUri(link);

    casper.thenOpen(fileLink, function() {
        casper.then(function () {
            // aggregate results for the 'phantomjs' search
            links = links.concat(this.evaluate(getLinks));
        });
    });

    casper.then(function () {
        // echo results in some pretty fashion
        this.echo(i + '-----https://drive.google.com' + links);
        //  result.push(links);
    });


    // });
});



casper.run(function () {

    var fs = require('fs');
    links.forEach(function(link, j) {
        fs.write('save/ti22tle.txt', 'https://drive.google.com' + link + '\n', 'a+');

    });

    this.exit();
});

/**
 *
 * @param uri
 * @returns {string}
 */
function parseUri(uri) {
    var parser = document.createElement('a');
    parser.href = uri;
    var pathname = parser.pathname;
    var re = /\s*\/\s*/;
    var pat = pathname.split(re);
    var fileLink = 'https://drive.google.com/uc?export=download&id=' + pat[3];

    return fileLink;
}

/**
 *
 * @returns {*}
 */
function getLinks() {
    var links = document.querySelectorAll('a#uc-download-link');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}