(function () {
    'use strict';

    angular.module('app')
        .controller('newRecipeController', newRecipeController);

    function newRecipeController(dataService, $localStorage, $state, jwtHelper) {
        if (!$localStorage.currentUser) {
            $state.go('login')
            return;
        };
        var tokenPayload = jwtHelper.decodeToken($localStorage.currentUser.token);
        var vm = this;
        vm.newItem = {
            title: null,
            text: null,
            userId: tokenPayload._id
        }

        vm.addItem = addItem;
        vm.cancel = cancel;

        function addItem() {
            dataService.create("recipes", vm.newItem, function (res) {
                if (res.status === 200) {
                    console.log("Recipe Added");
                    $state.go("myrecipes");
                }
                else {
                    console.log("ERROR: ", res);
                }

            });
        };

        function cancel(){
            $state.go("myrecipes");
        }

    }
})();