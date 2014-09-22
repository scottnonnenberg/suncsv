
'use strict';

var path = require('path');

var suncalc = require('suncalc');
var zip = require('zippity-do-dah');
var commander = require('commander');

var time = require('thehelp-time');

var config = require(path.join(__dirname, '../../package.json'));

var today = new Date();
var firstOfNextYear = new Date(today.getFullYear() + 1, 0, 1);
var endOfThisYear = time.offset(-time.DAY_IN_MIL, firstOfNextYear);

var makeDate = function makeDate(date) {
  return new Date(date);
};

var makeBoolean = function makeBoolean(bool) {
  return (bool !== 'false' && bool !== 'no');
};

var normalizeDate = function normalizeDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(),
    today.getHours(), today.getMinutes(), today.getSeconds());
};

var getEndTime = function getEndTime(start) {
  return time.offset(1000 * 50 * 15, start);
};

var formatDate = function formatDate(date) {
  var result = '';
  result += (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
  result += ',';
  result += time.addPadding(date.getHours(), 2) +
    ':' + time.addPadding(date.getMinutes(), 2) +
    ':' + time.addPadding(date.getSeconds(), 2);
  return result;
};

var createItem = function createItem(name, date, daylight) {
  var result = name + ',' + formatDate(date) + ',' + formatDate(getEndTime(date));
  result += ',Daylight length: ' + daylight;
  return result;
};

commander
  .version(config.version)
  .option('-z, --zip <zipcode>', 'Zipcode to use for location', '98103')
  .option('-b, --begin <date>', 'Start date (today)', makeDate, today)
  .option('-e, --end <date>', 'End date (end of this year)', makeDate, endOfThisYear)
  .option('-r, --sunrise <boolen>', 'Whether to export sunrise (true)', makeBoolean, true)
  .option('-s, --sunset <boolen>', 'Whether to export sunset (true)', makeBoolean, true)
  .parse(process.argv);

var gps = zip.zipcode(commander.zip);
var day = normalizeDate(commander.begin);
var end = normalizeDate(commander.end);

var total = 0;

// Google Calendar csv docs here: https://support.google.com/calendar/answer/45656
// Subject,Start Date,Start Time,End Date,End Time
// Final Exam,05/12/20,07:10:00 PM,05/12/20,10:00:00 PM,False
console.log('Subject,Start Date,Start Time,End Date,End Time,Description');

while (day.getTime() <= end.getTime()) {
  total += 1;

  var times = suncalc.getTimes(day, gps.latitude, gps.longitude);
  var daylight = times.sunset.getTime() - times.sunrise.getTime();
  daylight = time.renderTimespan(daylight);

  if (commander.sunrise) {
    var item = createItem('Sunrise', times.sunrise, daylight);
    console.log(item);
  }

  if (commander.sunset) {
    var item = createItem('Sunset', times.sunset, daylight);
    console.log(item);
  }

  day = time.offset(time.DAY_IN_MIL, day);
  day = normalizeDate(day);
}
