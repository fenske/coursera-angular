(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['MenuDataService', 'items'];
function ItemsController($stateParams, items) {
  var itemsCtrl = this;
  itemsCtrl.items = items.data.menu_items;
}

})();
