(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemBuyer = this;

  itemBuyer.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  }
  itemBuyer.items = ShoppingListCheckOffService.getToBuyItems();
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var itemShower = this;

  itemShower.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  var toBuyArray = [{ name: "cucumbers", quantity: 2 },
                    { name: "tomatoes", quantity: 10 },
                    { name: "carrots", quantity: 4 },
                    { name: "chicken breasts", quantity: 2 },
                    { name: "kg rice", quantity: 1 }];
  var boughtArray = [];

  service.buyItem = function (itemIndex) {
    var item = toBuyArray[itemIndex];
    toBuyArray.splice(itemIndex, 1);
    boughtArray.push(item);
  };

  service.getToBuyItems = function () {
    return toBuyArray;
  };

  service.getBoughtItems = function () {
    return boughtArray;
  };
}

})();
