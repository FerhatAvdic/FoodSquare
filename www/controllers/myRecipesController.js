(function () {
    'use strict';

    angular.module('app')
        .controller('myRecipesController', myRecipesController);

    function myRecipesController(dataService, $localStorage, $state, jwtHelper) {
        if (!$localStorage.currentUser) {
            $state.go('login')
            return;
        };
        //console.log("user", $localStorage.currentUser);
        var tokenPayload = jwtHelper.decodeToken($localStorage.currentUser.token);
        //console.log("token", tokenPayload);
        var vm = this;
        vm.deleteItem = deleteItem;

        listItems();

        function listItems() {
            dataService.readByQuery("recipes/byUser", { userId: tokenPayload._id}, function (res) {
                if (res.status === 200) {
                    vm.items = res.data;
                }
                else {
                    console.log("ERROR: ", res);
                }

            });
        };

        function deleteItem(id) {
            if (confirm("Are you sure you want to delete this item?")) {
                dataService.remove("recipes", id, function (res) {
                    if (res.status === 200) {
                        listItems();
                    }
                    else {
                        console.log('Error: ' + res.data);
                    }
                });
            } else {
                
            } 
        };

    }
})();