(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://ancient-garden-12760.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
