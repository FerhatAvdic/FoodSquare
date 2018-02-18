(function() {
    'use strict';
  
    angular.module('app')
        .controller('loginController', loginController);
  
    function loginController($location, authService, $window) {
        var vm = this;
        vm.username = null;
        vm.password = null;
        vm.login = login;

        function login() {
            vm.loading = true;
            console.log("HELLO");
            authService.Login(vm.username, vm.password, function (result) {
                console.log("result", result);
                if (result === true) {
                    $location.path('/');
                    $window.location.reload();
                } else {
                    vm.error = 'Username or password is incorrect';
                    vm.loading = false;
                }
            });
        };
    }
  })();