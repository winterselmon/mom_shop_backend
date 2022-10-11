const moment = require('moment');

function getDate(date) {
    const dmy = moment(date)
    const result = {
        day: dmy.format('dd'),
        month: dmy.format('MM'),
        year: dmy.format('YYYY'),
    }
    return result
}

module.exports = {

    getDate: getDate,
};