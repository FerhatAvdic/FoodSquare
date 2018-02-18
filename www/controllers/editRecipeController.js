(function () {
    'use strict';

    angular.module('app')
        .controller('editRecipeController', editRecipeController);

    function editRecipeController(dataService, $localStorage, $state, $stateParams, jwtHelper) {
        if (!$localStorage.currentUser) {
            $state.go('login')
            return;
        };
        var tokenPayload = jwtHelper.decodeToken($localStorage.currentUser.token);
        var vm = this;
        vm.editItem = {
            _id: $stateParams.id,
            title: null,
            text: null,
            userId: tokenPayload._id
        }

        vm.updateItem = updateItem;
        vm.cancel = cancel;

        getItem();

        function getItem(){
            dataService.read("recipes", vm.editItem._id, function (res) {
                if (res.status === 200) {
                    vm.editItem.title = res.data.title;
                    vm.editItem.text = res.data.text;
                    console.log("item data", res.data);
                }
                else {
                    console.log("ERROR: ", res);
                }

            });
        }

        function updateItem() {
            dataService.update("recipes", vm.editItem._id, vm.editItem, function (res) {
                if (res.status === 200) {
                    console.log("Recipe Updated");
                    $state.go("myrecipes");
                }
                else {
                    console.log("ERROR: ", res);
                }

            });
        };

        function cancel() {
            $state.go("myrecipes");
        }

    }
})();