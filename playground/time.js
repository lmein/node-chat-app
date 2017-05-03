//unix epic - jan 1st, 1970 00:00:00 am UTC = 0 for timestamp
//momemnt - work with time in js.
const moment = require('moment');

var olddate = new Date();
console.log(olddate);

var date = moment();
console.log(date.format('MMM Do, YYYY h:mm:ss A'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);
