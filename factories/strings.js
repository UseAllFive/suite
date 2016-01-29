/* global angular */
angular.module('suite')
    .factory('StringsFactory', [function() {
        return {
            /**
            *  Convert a myriad of time strings to a proper date:
            *  '1:00 pm','1:00 p.m.','1:00 p','1:00pm',
            *  '1:00p.m.','1:00p','1 pm','1 p.m.','1 p',
            *  '1pm','1p.m.', '1p','13:00','13'
            */
            parseTime: function(timeString, day) {
                var timeDay = new Date(day);
                var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/);
                //Check if day is valid
                if (Object.prototype.toString.call(timeDay) === "[object Date]") {
                    timeDay = new Date();
                }
                timeDay.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
                timeDay.setMinutes(parseInt(time[2]) || 0);
                return timeDay;
            }
        };
    }
]);
