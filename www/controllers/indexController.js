(function() {
    'use strict';
  
    angular.module('app')
        .controller('indexController', indexController);
  
    function indexController($localStorage,jwtHelper, authService, $window) {
        var vm = this;
        var tokenPayload = null;
        vm.user_id = null;
        vm.logout = logout;
        if($localStorage.currentUser) {
            tokenPayload = jwtHelper.decodeToken($localStorage.currentUser.token);
            vm.user_id = tokenPayload._id;
        }

        function logout(){
            authService.Logout();
            $window.location.reload();
        }


    }
  })();