(function() {
    'use strict';
  
    angular.module('app')
        .controller('viewController', viewController);
  
    function viewController(dataService) {
        var vm = this;

        listItems();

        function listItems(){
            dataService.list("recipes", function (res) {
                if (res.status === 200) {
                    vm.items = res.data;
                }
                else {
                    console.log("ERROR: ", res);
                }
                
            });
        };

    }
  })();