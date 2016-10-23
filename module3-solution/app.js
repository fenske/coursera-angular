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
      foundItems: '<'
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

  narrower.searchTerm = "";

  narrower.findItems = function() {

    var promise = MenuSearchService.getMatchedMenuItems(narrower.searchTerm);

    promise.then(function (response) {
      // process result and only keep items that match
      narrower.foundItems = [];
      for (var i = 0; i < response.data.menu_items.length; i++) {
        if (response.data.menu_items[i].description.indexOf(narrower.searchTerm) !== -1) {
          narrower.foundItems.push(response.data.menu_items[i]);
        }
      }
      console.log(narrower.foundItems);
    }).catch(function(error) {
      console.log("Something went wrong: " + error);
    });
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
