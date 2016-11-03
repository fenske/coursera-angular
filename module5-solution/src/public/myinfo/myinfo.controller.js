(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['userData'];
function MyInfoController(userData) {
  var $ctrl = this;
  $ctrl.userData = userData;
}

})();
