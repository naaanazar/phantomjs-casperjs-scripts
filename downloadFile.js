/**
 * Created by naaanazar on 13.06.2017.
 */
var casper = require("casper").create();

casper.start("http://www.google.fr/", function() {
    this.download("http://www.google.fr/images/srpr/logo3w.png", "logo.png");
});

casper.run();