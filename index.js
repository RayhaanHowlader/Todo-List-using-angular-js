var myNinjaApp=angular.module("myNinjaApp",["ngRoute","ngAnimate"]);

myNinjaApp.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider){
$locationProvider.html5Mode(true);
$routeProvider
.when("/home",{
    templateUrl:'home.html',
    controller:'myNinjaAppController'
})

.when('/contact',{
    templateUrl:'contact.html',
    controller:'ContactController'
})

.when('/directory',{
    templateUrl:'directory.html',
    controller:'myNinjaAppController'
})
.when('/contact-success',{
    templateUrl:'contact-success.html',
    controller:'ContactController'
})
.otherwise({
    redirectTo:'/home'
})
}])
myNinjaApp.directive("randomNinja",[function(){
    return {restrict:'E',
        scope:{
            ninjas:"=",
            title:"="
        },
        templateUrl:'random.html',
        transclude:true,
        controller:function($scope){
            $scope.random=Math.floor(Math.random()*2);
        }
    }
}]);
myNinjaApp.controller("myNinjaAppController",["$scope","$http",function($scope,$http){
    $scope.message="hello bhai";
    $scope.removeNinja=function(ninja){
      var removeNinja=$scope.ninjas.indexOf(ninja);
      $scope.ninjas.splice(removeNinja,1)
    }
    $scope.addNinja=function(){
        $scope.ninjas.push({name:$scope.newninja.name,rate:parseInt($scope.newninja.rate),belt:$scope.newninja.belt,available:true})
        $scope.newninja.name="";
        $scope.newninja.rate="";
        $scope.newninja.belt="";

    }
    $scope.removeAll=function(){
        $scope.ninjas=[];
    }

    $http.get('ninjas.json').then(function(response) {
        $scope.ninjas = response.data;
    });



}])
myNinjaApp.controller('ContactController',['$scope','$location',function($scope,$location){
    $scope.sendMessage=function(){
        $location.path('contact-success');
    }
}])