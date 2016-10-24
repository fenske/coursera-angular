(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsList.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'narrower',
    bindToController: true
  };
  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrower = this;

  narrower.findItems = function() {
    var promise = MenuSearchService.getMatchedMenuItems(narrower.searchTerm);
    promise.then(function (response) {
      MenuSearchService.filterMenuItems(
        narrower.searchTerm, response.data.menu_items);
      narrower.searchTerm = "";
      narrower.foundItems = MenuSearchService.getMenuItems();
    }).catch(function(error) {
      console.log("Something went wrong: " + error);
    });
  }

  narrower.removeItem = function(index) {
    MenuSearchService.removeMenuItem(index);
  }
}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
  var service = this;

  var foundItems = [];

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    });
    return response;
  }

  service.filterMenuItems = function(searchTerm, menuItems) {
    foundItems.splice(0, foundItems.length);
    if (searchTerm === "") {
      return;
    }
    for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].description.indexOf(searchTerm) !== -1) {
        foundItems.push(menuItems[i]);
      }
    }
  }

  service.removeMenuItem = function(index) {
    foundItems.splice(index, 1);
  }

  service.getMenuItems = function () {
    return foundItems;
  };
}
})();
