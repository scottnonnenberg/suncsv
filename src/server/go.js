'use strict';

// The actual program - the binary juse `require()`s this file.

var path = require('path');

var zip = require('zippity-do-dah');
var commander = require('commander');
var suncalc = require('suncalc');

var util = require('./util');
var config = require(path.join(__dirname, '../../package.json'));

var startup = function startup(today) {
  // Set up some default
  var firstOfNextYear = new Date(today.getFullYear() + 1, 0, 1);
  var endOfThisYear = util.offset(-util.DAY_IN_MIL, firstOfNextYear);

  // Delegate option parsing, help display, etc. to `commander`
  commander
    .version(config.version)
    .option('-z, --zip <zipcode>', 'Zipcode to use for location', '98103')
    .option('-b, --begin <date>', 'Start date (today)', util.makeDate, today)
    .option('-e, --end <date>', 'End date (end of this year)',
      util.makeDate, endOfThisYear)
    .option('-r, --sunrise <boolean>', 'Whether to export sunrise (true)',
      util.makeBoolean, true)
    .option('-s, --sunset <boolean>', 'Whether to export sunset (true)',
      util.makeBoolean, true)
    .parse(process.argv);
};

var processDay = function processDay(day, gps) {
  // Thanks, `suncalc` for your awesomeness
  var item;
  var times = suncalc.getTimes(day, gps.latitude, gps.longitude);
  var daylight = util.renderTimespan(times.sunrise, times.sunset);

  // Print out sunset and sunrise rows

  if (commander.sunrise) {
    item = util.createItem('Sunrise', times.sunrise, daylight);
    console.log(item);
  }

  if (commander.sunset) {
    item = util.createItem('Sunset', times.sunset, daylight);
    console.log(item);
  }
};


// Okay, here we go...

var today = new Date();
startup(today);

// Prepare working variables
var gps = zip.zipcode(commander.zip);
var day = util.normalizeDate(commander.begin, today);
var end = util.normalizeDate(commander.end, today);

// Write out the CSV header
console.log(util.csvHeader);

while (day.getTime() <= end.getTime()) {
  processDay(day, gps);

  day = util.offset(util.DAY_IN_MIL, day);
  day = util.normalizeDate(day, today);
}
