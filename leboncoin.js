//aliexpress

var linkToGrubPage = null;
var countPage =1;
var pageMassege = '';

var utils = require('utils');
var fs = require('fs');

casper = require('casper').create({
    logLevel: "debug",              // Only "info" level messages will be logged
    // verbose: true,                  // log messages will be printed out to the console
    pageSettings: {
        loadImages:  true,        // do not load images
        loadPlugins: false        // do not load NPAPI plugins (Flash, Silverlight, ...)
    }
});

var url = casper.cli.args[0];

casper.start(
    url,
    function() {
    });
casper.viewport(1920, 1080);


casper.then(function () {
    casper.capture('results/bot/screenshots/step1.png');
});
casper.then(function() {
    links = this.evaluate(getId);
    casper.each(links, function (self, link, i) {
        casper.echo(i + 'get----' + link);

        casper.wait(3000, function() {

            casper.then(function() {

                casper.then(function () {
                   // pageMassege = this.evaluate(getPageMassege);
                    casper.thenOpen('https://www.leboncoin.fr/ar/form/0?ca=6_s&id=' + 1151014928, function () {
                        casper.echo(i + ' --- go to form ---- ' +  pageMassege);
                    });
                });
/*


                casper.then(function () {
                    casper.capture('results/bot/screenshots/step3/step3_' + i + pageMassege + '.png');
                    casper.echo('Send form: '+ this.getTitle());
                });

                casper.then(function () {
                    if (this.exists('form#adreply_form')) {
                        this.fillSelectors('form#adreply_form', {
                            'input[name="name"]': 'Nazar',
                            'input[name="email"]': 'nazar.k.php@gmail.com',
                            'input[name="phone"]': '0299568959',
                            'textarea[name="body"]': 'Good car',
                            'input[name="cc"]': 1
                        }, true);
                    }
                });


                casper.then(function () {
                    casper.wait(2500, function() {
                        casper.capture('results/bot/screenshots/22' + i + '.png');
                    });
                });*/
                /*casper.then(function() {
                 // Click on 1st result link
                 this.click('input[name="send"]');
                 });*/
                /*
                 casper.then(function () {
                 casper.capture('results/bot/screenshots/step4/step4_' + i + '.png');
                 });
                 */
            });
        });
    });
});


casper.run(function () {

    this.exit();
});


function getPageMassege(){
    return document.querySelector('aside.sidebar div div div a').getAttribute('href');
}


function getIDs() {
    var id = document.querySelectorAll('section.tabsContent  ul li a.list_item div.saveAd');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('data-savead-id');
    });
}
















