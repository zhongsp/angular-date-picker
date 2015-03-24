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
      var now = new Date();

      scope.model = {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        years: makeNumbersArray(2020, 1990),
        currentView: 'day'
      };

      scope.today = parseDate(now);

      initCalendar();

      scope.selectDate = function(day) {
        scope.onSelectDate({
          date: new Date(scope.model.year, scope.model.month, day)
        });
      };

      scope.viewMonth = function(offset) {
        if (offset === 0) {
          scope.model.currentView = 'day';
          initCalendar();

        } else {
          initCalendar(scope.model.year, scope.model.month + offset);
        }
      };

      scope.setMonth = function(month) {
        month = month || 0;
        scope.model.month = month;
        scope.model.currentView = 'day';
        initCalendar(scope.model.year, scope.model.month);
      };

      scope.setYear = function(year) {
        year = year || 0;
        scope.model.year = year;
        scope.model.currentView = 'month';
      };

      scope.viewAllMonths = function() {
        scope.model.currentView = 'month';

      };

      scope.viewAllYears = function() {
        scope.model.currentView = 'year';
      };

      function initCalendar(year, month) {
        var date = null;

        if (typeof year == 'undefined') {
          date = now;

        } else {
          date = new Date(year, month);
        }

        angular.extend(scope.model, parseDate(date));
        scope.model.daysInMonth = calculateDaysInMonth(scope.model.month, scope.model.year);
        scope.model.fisrtDayOffset = calculateFisrtDayOffset(scope.model.month, scope.model.year);
      }
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
        return makeNumbersArray(31);
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        return makeNumbersArray(30);
        break;
      case 2:
        return isLeapYear(year) ? makeNumbersArray(29) : makeNumbersArray(28);
        break;
      default:
    }
  }

  function makeNumbersArray(to, from) {
    var array = [],
      i;

    from = from || 1;
    i = from

    if (to >= from) {
      while (array.push(i) <= (to - from)) {
        i++;
      }
    }

    return array;
  }

  function isLeapYear(year) {
    return year % 4 == 0 && year % 100 != 0 || year % 400 == 0;
  }

  function calculateFisrtDayOffset(month, year) {
    var currentDate = new Date(year, month, 01);

    return currentDate.getDay();
  }

  function lastMonth() {

  }
});