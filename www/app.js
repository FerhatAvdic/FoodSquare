(function () {

    var  app = angular.module('app', ['ui.router','ngStorage','ngMessages', 'angular-jwt']);

    app.config(function ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('view', {
                url: "/",
                templateUrl: "./www/views/view.html",
                controller: 'viewController as vm'
            })
            .state('myrecipes', {
                url: "/myrecipes",
                templateUrl: "./www/views/myRecipes.html",
                controller: 'myRecipesController as vm'
            })
            .state('recipeItem', {
                url: "/recipes/:id",
                templateUrl: "./www/views/recipeItem.html",
                controller: 'recipeItemController as vm'
            })
            .state('editRecipe', {
                url: "/myrecipes/:id",
                templateUrl: "./www/views/editRecipe.html",
                controller: 'editRecipeController as vm'
            })
            .state('newRecipe', {
                url: "/newrecipe",
                templateUrl: "./www/views/newRecipe.html",
                controller: 'newRecipeController as vm'
            })
            .state('login', {
                url: "/login",
                templateUrl: "./www/views/login.html",
                controller: 'loginController as vm'
            })
            .state('signup', {
                url: "/signup",
                templateUrl: "./www/views/signup.html",
                controller: 'signupController as vm'
            })

    })
    .run(function($rootScope, $http, $location, $localStorage, jwtHelper, authService, $window) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = $localStorage.currentUser.token;
        }
        // redirect to login page if not logged in and trying to access a restricted page
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var restrictedPages = ['/myRecipes'];
            var restrictedPage = restrictedPages.indexOf($location.path()) !== -1;
            if ($localStorage.currentUser){
                var tokenPayload = jwtHelper.decodeToken($localStorage.currentUser.token);
                var tokenExpired = jwtHelper.isTokenExpired($localStorage.currentUser.token);
                if(tokenExpired){
                    authService.Logout();
                }
                //console.log("token",$localStorage.currentUser.token,"tokenExpiration", tokenExpired);
                if ((restrictedPage && tokenExpired) || !tokenPayload.role === 'user') {
                    authService.Logout();
                    $location.path('/login');
                }
                else if(!tokenExpired && ($location.path()==='/login' || $location.path() === '/signup')){
                    //if loged in home is trying to access public pages aka login
                    $location.path('/');
                }
            }else if (restrictedPage){
                $location.path('/login');
            }
        });

    });


}());
