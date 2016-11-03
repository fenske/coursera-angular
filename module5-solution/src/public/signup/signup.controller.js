(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService'];
function SignupController(MenuService) {
  var signupCtrl = this;

  signupCtrl.submit = function () {
    var promise = MenuService.getMenuItem(signupCtrl.user.favoriteDish);
    promise.then(function (response) {
      MenuService.setUserData({user: signupCtrl.user, favoriteDish: response.data});
      console.log(response.data);
      signupCtrl.status = 'Success';
    }).catch(function(error) {
      signupCtrl.status = 'Failed';
    });
    signupCtrl.completed = true;
  };
}

})();
