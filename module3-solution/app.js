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
      narrower.foundItems = filterMenuItems(
        narrower.searchTerm, response.data.menu_items);
      narrower.searchTerm = "";
    }).catch(function(error) {
      console.log("Something went wrong: " + error);
    });
  }

  function filterMenuItems(searchTerm, menuItems) {
    var foundItems = [];
    for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].description.indexOf(searchTerm) !== -1) {
        foundItems.push(menuItems[i]);
      }
    }
    return foundItems;
  }

  narrower.removeItem = function(index) {
    //FIXME Implement logic in the service instead
    narrower.foundItems.splice(index, 1);
  }
}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    });
    return response;
  }
}
})();
