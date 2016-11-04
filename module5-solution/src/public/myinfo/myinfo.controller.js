(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['userData', 'ApiPath'];
function MyInfoController(userData, ApiPath) {
  var myinfoCtrl = this;
  myinfoCtrl.userData = userData;
  myinfoCtrl.basePath = ApiPath;
  console.log(myinfoCtrl.userData)
}

})();
