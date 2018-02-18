(function () {
    'use strict';

    angular.module('app')
        .controller('recipeItemController', recipeItemController);

    function recipeItemController(dataService, $state, $stateParams) {
        var vm = this;
        vm.recipeItem = {};

        getItem();

        function getItem() {
            dataService.read("recipes", $stateParams.id, function (res) {
                if (res.status === 200) {
                    vm.recipeItem.title = res.data.title;
                    vm.recipeItem.text = res.data.text;
                   //console.log("item data", res.data);
                }
                else {
                    console.log("ERROR: ", res);
                }

            });
        }

    }
})();