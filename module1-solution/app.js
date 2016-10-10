(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', function ($scope) {
  //To make the 'empty check' work
  $scope.menu = "";

  $scope.checkItems = function () {
      var number  = getNumberOfItems($scope.menu.split(','));
      evaluateNumber(number);
  }

  function getNumberOfItems(arr) {
      var itemsNumber = 0;
      arr.forEach(function(item) {
        if (item) itemsNumber++;
      });
      return itemsNumber;
  }

  function evaluateNumber(number) {
      if (number >= 1 && number <= 3) $scope.result = "Enjoy!";
      else if (number > 3)            $scope.result = "Too much!";
      else if (number == 0)           $scope.result = "Please enter data first";
  }
});

})();
