//aliexpress

var links = [];
var results = [];
var linkToGrubPage = null;
var countPage =1;

var utils = require('utils');
var fs = require('fs');

casper = require('casper').create({
    logLevel: "debug",              // Only "info" level messages will be logged
    verbose: true,                  // log messages will be printed out to the console
    pageSettings: {
     //  loadImages:  false,        // do not load images
        loadPlugins: false         // do not load NPAPI plugins (Flash, Silverlight, ...)
    }
});

casper.start('https://www.aliexpress.com/wholesale?ltype=wholesale&d=y&origin=y&isViewCP=y&catId=0&initiative_id=SB_20170614012629&SearchText=telephone&blanktest=0&tc=af', function() {

});



    casper.then(grubPage);

casper.run(function () {
    this.exit();
});


function grubPage(){
    casper.echo('start');
    casper.echo(linkToGrubPage);

    if (linkToGrubPage !== null) {
        casper.thenOpen(linkToGrubPage, function () {
            casper.capture('screenshots/crub_' + countPage + '.png');
        });
    }

    casper.then(function () {
        casper.capture('screenshots/crub_' + countPage + '.png');
    });

    casper.then(function () {
        casper.capture('screenshots/test2.png');
        var results = this.evaluate(getContentProducts);

        casper.then(function () {
            casper.each(results, function (self, link, i) {
                console.log(i + '----' + link.img);

                stream = fs.open('csv/quotes.csv','aw');
                stream.writeLine(link.page_link + ',"' + link.page_link_name + '","' + link.price + '","' + link.order + '",' + link.img);
                stream.flush();
                stream.close();
            });
        });


        countPage++;
        casper.echo('------------------------------------END------------------------------------------');

    });

    casper.then(function () {
        linkToGrubPage = 'https:' + this.evaluate(getNextPage);
        if(linkToGrubPage.length > 12) {
            casper.echo(linkToGrubPage);

            casper.wait(5000, function() {
                casper.then(grubPage);
            });
        }
    });
}

function getNextPage(){
    return document.querySelector('.ui-pagination-active').nextElementSibling.getAttribute('href');
}

function getinfo() {
    var links = document.querySelectorAll('div.info h3 a');
    console.log(links);
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}

function getContentProducts() {
    var el = document.querySelectorAll('li.list-item');
    elements =  Array.prototype.map.call(el, function(e) {
        //  console.log($(e).find('.history-item').attr('href'));
        var content = {};
        var link  = (e).querySelector('h3 a.history-item');

        var imgLink  = (e).querySelector('img.picCore');

        var price  = (e).querySelector('div.info span.price span.value');

        var order  = (e).querySelector('a.order-num-a em');

        console.log(price.textContent);

        content['page_link'] = link.getAttribute('href');
        content['page_link_name'] = link.textContent;

        if ((e).querySelector('img').getAttribute('image-src')){
            content['img'] = imgLink.getAttribute('image-src');
        }
        if ((e).querySelector('img').getAttribute('src')){
            content['img'] = imgLink.getAttribute('src');
        }
        content['price'] = price.textContent;
        content['order'] = order.textContent;

        return content;
    });

    return elements;
}


function getLinks() {
    var links = document.querySelectorAll('div.info h3 a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}
















