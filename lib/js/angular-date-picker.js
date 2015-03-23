angular.module('datepicker', [])
  .directive('datepicker', function() {
    return {
      templateUrl: '../lib/templates/date-picker.html',
      replace: true,
      scope: {
        datepicker: '=',
        currentDate: '@',
        cssClass: '@',
        onSelectDate: '&'
      },
      link: function(scope) {
        angular.extend(scope, parseDate(scope.currentDate));
        scope.daysInMonth = calculateDaysInMonth(scope.month, scope.year);
      }
    };

    function parseDate(date) {
      var currentDate = new Date(date);

      return {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      day: currentDate.getDate()
      };
    }

    function calculateDaysInMonth(month, year) {
      // Month starts from 0
      switch (month + 1) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          return makeDaysArray(31);
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          return makeDaysArray(30);
          break;
        case 2:
          return isLeapYear(year) ? makeDaysArray(29) : makeDaysArray(28);
          break;
        default:
      }
    }

    function makeDaysArray(max) {
      var days = [],
        i = 1;

      while (days.push(i) < max) {
        i++;
      }

      return days;
    }

    function isLeapYear(year) {
      return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
    }
  });