//aliexpress

var linkToGrubPage = null;
var countPage =1;

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

casper.start(
    '',
    function() {
});
casper.viewport(1920, 1080);


casper.then(function () {
    casper.capture('results/bot/screenshots/step1.png');
});
casper.then(function() {
    links = this.evaluate(getLinks);
    casper.each(links, function (self, link, i) {
        casper.echo(i + '----' + link);

        casper.wait(10000, function() {

            casper.then(function() {
                casper.thenOpen('https:' + link, function () {
                });
                casper.then(function () {
                    casper.capture('results/bot/screenshots/step2/step2_' + i + '.png');
                    casper.echo(i + '----' +'https:' + link);
                });

               /* casper.then(function() {
                 // Click on 1st result link
                 this.click('aside.sidebar div div div a');
                    casper.echo(i + '--*****************--' + 'CLICK');
                 });*/

                casper.then(function () {
                    var pageMassege = this.evaluate(getPageMassege);
                    casper.thenOpen('https:' + pageMassege, function () {
                        casper.echo(i + 'next--' +  pageMassege);
                    });
                });

                links = this.evaluate(getLinks);

                casper.then(function () {
                    casper.capture('results/bot/screenshots/step3/step3_' + i + '.png');
                    casper.echo(i + '----' + 'step3');
                });



                 casper.then(function () {
                     this.fillSelectors('form#adreply_form', {
                     'input[name="name"]':    'Nazar',
                     'input[name="email"]':    'nazar.k.php@gmail.com',
                     'input[name="phone"]':   '0299568959',
                     'textarea[name="body"]':       'Good car',
                     'input[name="cc"]':         1
                     }, true);
                 });


                 casper.then(function () {
                     casper.wait(2500, function() {
                        casper.capture('results/bot/screenshots/22' + i + '.png');
                     });
                 });
                 /*casper.then(function() {
                 // Click on 1st result link
                 this.click('input[name="send"]');
                 });*/

                 casper.then(function () {
                    casper.capture('results/bot/screenshots/step4/step4_' + i + '.png');
                 });

            });
        });


    });

});



/*
casper.then(function () {
    casper.capture('results/bot/screenshots/11.png');
});*/

/*
casper.then(function () {
    this.fillSelectors('form#adreply_form', {
    'input[name="name"]':    'Nazar',
    'input[name="email"]':    'nazar.k.php@gmail.com',
    'input[name="phone"]':   '0299568959',
    'textarea[name="body"]':       'Hello',
    'input[name="cc"]':         1
}, true);
});


    casper.then(function () {
        casper.wait(2500, function() {
            casper.capture('results/bot/screenshots/22.png');
    });
});
/*casper.then(function() {
    // Click on 1st result link
    this.click('input[name="send"]');
});*/
/*
casper.then(function () {
    casper.capture('results/bot/screenshots/33.png');
});
*/

casper.run(function () {

    this.exit();
});


function getPageMassege(){
    return document.querySelector('aside.sidebar div div div a').getAttribute('href');
}


function getLinks() {
    var links = document.querySelectorAll('section.tabsContent  ul li a.list_item');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
}
















