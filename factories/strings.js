/* global angular */
angular.module('suite')
    .factory('StringsFactory', [function() {
        return {
            /**
            *  Convert a myriad of time strings to a proper date:
            *  '1:00 pm','1:00 p.m.','1:00 p','1:00pm',
            *  '1:00p.m.','1:00p','1 pm','1 p.m.','1 p',
            *  '1pm','1p.m.', '1p','13:00','13'
            *   From: http://stackoverflow.com/questions/141348/what-is-the-best-way-to-parse-a-time-into-a-date-object-from-user-input-in-javas
            */
            parseTime: function(timeString, date) {
                var time, hours, d;
                if (timeString === '') {
                    return null;
                }

                d = new Date(date);

                if (Object.prototype.toString.call(d) === "[object Date]") {
                    d = new Date();
                }

                time = timeString.match(/(\d+)(:(\d\d))?\s*(p?)/i);
                if (time === null) {
                    return null;
                }

                hours = parseInt(time[1],10);
                if (hours === 12 && !time[4]) {
                    hours = 0;
                } else {
                    hours += (hours < 12 && time[4]) ? 12 : 0;
                }

                d.setHours(hours);
                d.setMinutes(parseInt(time[3],10) || 0);
                d.setSeconds(0, 0);
                return d;
            }
        };
    }
]);
