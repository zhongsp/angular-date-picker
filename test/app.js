angular.module('app', ['datepicker'])
  .controller('AppController', function($scope) {
    $scope.model = {
      date: null
    };

    $scope.selectDate = function(date) {
      console.log(date);
    };
  });
  