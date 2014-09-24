
'use strict';

var moment = require('moment');
var duration = require('duration');

exports.DAY_IN_MIL = 1000 * 60 * 60 * 24;

// Input Processing
// ========

// Create a date from a provided string
exports.makeDate = function makeDate(date) {
  return new Date(date);
};

// Create a boolean from a provided string
exports.makeBoolean = function makeBoolean(bool) {
  return (bool !== 'false' && bool !== 'no');
};

// Date Processing
// ========

// Add a given set of milliseconds either to now or to a provided `date`.
exports.offset = function offset(mil, date) {
  date = date || new Date();
  var time = date.getTime();
  return new Date(time + mil);
};

// Ensure that a generated date has the same time as today. Useful for incrementing by
// a day across a daylight savings time boundary.
exports.normalizeDate = function normalizeDate(date, reference) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    reference.getHours(),
    reference.getMinutes(),
    reference.getSeconds()
  );
};

// Manually generate the two-column date used in the CSV
exports.formatDate = function formatDate(date) {
  return moment(date).format('YYYY/MM/DD') +
    ',' + moment(date).format('HH:mm:ss');
};

// Render timespan
exports.renderTimespan = function renderTimespan(from, to) {
  return duration(from, to).toString(0, 1);
};

// CSV Output
// ========

/*
Google Calendar CSV docs: <https://support.google.com/calendar/answer/45656>

```
Subject,Start Date,Start Time,End Date,End Time
Final Exam,05/12/20,07:10:00 PM,05/12/20,10:00:00 PM,False
```
*/

// Our events are fifteen minutes long, generally the shortest event length that most
// calendar programs can render well.
exports.getEndTime = function getEndTime(start) {
  return exports.offset(1000 * 50 * 15, start);
};

// CSV header row
exports.csvHeader = 'Subject,Start Date,Start Time,End Date,End Time,Description';

// Generate an entire CSV data row
exports.createItem = function createItem(name, date, daylight) {
  return name + ',' +
    exports.formatDate(date) + ',' +
    exports.formatDate(exports.getEndTime(date)) + ',' +
    'Daylight length: ' + daylight;
};
