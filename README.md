# phantomjs-casperjs-scripts
    
#### install phantomjs ubuntu 14.04

```sudo apt-get update
sudo apt-get install build-essential chrpath libssl-dev libxft-dev -y
sudo apt-get install libfreetype6 libfreetype6-dev -y
sudo apt-get install libfontconfig1 libfontconfig1-dev -y
cd ~
export PHANTOM_JS="phantomjs-2.1.1-linux-x86_64"
wget https://github.com/Medium/phantomjs/releases/download/v2.1.1/$PHANTOM_JS.tar.bz2
sudo tar xvjf $PHANTOM_JS.tar.bz2
sudo mv $PHANTOM_JS /usr/local/share
sudo ln -sf /usr/local/share/$PHANTOM_JS/bin/phantomjs /usr/local/bin
phantomjs --version
```
#### install casperjs ubuntu
```
$ git clone git://github.com/casperjs/casperjs.git
$ cd casperjs
$ ln -sf `pwd`/bin/casperjs /usr/local/bin/casperjs
```
####casper js notes
######вернути об'єкт
```
this.echo(casper.evaluate(function(myObject ) {
    return JSON.stringify(myObject);
}, results));
```

######записати json
```
var fs = require('fs');
fs.write('myFile.json', casper.evaluate(function(myObject ) {
    return JSON.stringify(myObject);
}, results), 'w');
```