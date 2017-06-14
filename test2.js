var quotes = 0;
var maxLinks = 5;
var firstUrl = 'http://www.imdb.com/search/title?at=0&num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_infoss';

var x = require('casper').selectXPath;
var fs = require('fs');
var utils = require('utils');

var casper = require('casper').create({
    verbose: true,
    logLevel: 'error',
    pageSettings: {
        loadImages: false,
        loadPlugins: false,
        userAgent: 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.2 Safari/537.36'
    }
});

//Functions------------------------

function getLinks() {
    var links = document.querySelectorAll('.results td.image a');
    return Array.prototype.map.call(links, function(e) {
        var href = e.getAttribute('href');
        var url = 'http://www.imdb.com'+href+'quotes/';
        return url;
    });
}

//Crawl------------------------

casper.start(firstUrl);

casper.then(function() {
    links = this.evaluate(getLinks);
    var j = 0;
    this.eachThen(links,function(response){
        j++;
        if(j >= maxLinks) return;

        this.thenOpen(response.data, function writeOnCSV() {
            casper.echo(this.getCurrentUrl());

            var objectsCount = this.evaluate(function(){
                return __utils__.findAll('.list .quote p').length;
            });

            var objects = this.evaluate(function(){
                return __utils__.findAll('.list .quote p');
            });

            if(objectsCount != undefined) {
                for(i = 0; i < objectsCount; i++) {
                    if(objects[i] != null) {
                        quote = objects[i]['innerText'];
                        stream = fs.open('csv/quotes.csv','aw');
                        stream.writeLine(quote);
                        stream.flush();
                        stream.close();
                        quotes++;
                    }
                }

            }
        });

    });
});

casper.run(function() {
    this.echo(links.length + ' links found:');
    this.echo(quotes.length + 'quotes found:');
    this.exit();
});
