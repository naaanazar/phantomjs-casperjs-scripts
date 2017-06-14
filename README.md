# phantomjs-casperjs-scripts



    //вернути об'єкт
    this.echo(casper.evaluate(function(myObject ) {
        return JSON.stringify(myObject);
    }, results));

    // записати json
    var fs = require('fs');
    fs.write('myFile.json', casper.evaluate(function(myObject ) {
        return JSON.stringify(myObject);
    }, results), 'w');