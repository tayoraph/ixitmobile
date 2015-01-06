(function () {
  var app = angular.module('auth', []);
  app.controller('RegisterCtrl', ['$scope', function ($scope) {

  }]);
  app.controller('RegisterLoginCtrl', function($scope, $http, $state, AuthenticationService, $ionicPopup, $window, $ionicPlatform) {

    $ionicPlatform.onHardwareBackButton(function () {
      return false;
    });

    $scope.message = "";

    $scope.form = {
      username: null,
      password: null
    };

    $scope.loginBtn = function(form) {
      AuthenticationService.login(form);
    };
    $scope.RegisterBtn = function(form) {
      AuthenticationService.register(form, function (res) {
        if (res instanceof Error) {
          // An alert dialog
          var alertPopup = $ionicPopup.alert({
           title: 'Oops!',
           template: res.message
          });
          alertPopup.then(function(res) {
            $scope.auth_message = res.message;
          });
        } else {
          $scope.$emit('event:auth-loginConfirmed');
        }
      });
    };

    $scope.$on('event:auth-loginConfirmed', function() {
     $scope.username = null;
     $scope.password = null;
     $state.go('app.files');
    });

    $scope.$on('event:auth-login-failed', function(e, status) {
      var error = "Login failed.";
      if (status == 401) {
        error = "Invalid Username or Password.";
      }
      // An alert dialog
      var alertPopup = $ionicPopup.alert({
       title: 'Sorry!',
       template: error
      });
      alertPopup.then(function(res) {
        $scope.auth_message = error;
      });
    });

  });
  app.controller('LogoutCtrl', function($scope, AuthenticationService, $window) {
      AuthenticationService.logout();
      delete $window.sessionStorage.authorizationToken;
  });
})();