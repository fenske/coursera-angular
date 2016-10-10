(function () {
'use strict';

angular.module('LunchCheck', [])
       .controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
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
      $scope.lunchStyle = {color:'green', padding:'6px', border:'2px solid green'};

      if (number === 0) {
        $scope.lunchStyle = {color:'red', padding:'6px', border:'4px dashed red'};
        $scope.result = "Please enter data first";
      }
      else if (number >= 1 && number <= 3) $scope.result = "Enjoy!";
      else if (number > 3)                 $scope.result = "Too much!";
  }
}

})();
