'use strict';

angular.module('login')
  .controller('LoginCtrl', function($state, config, loginService, $rootScope, log, $scope) {
    var vm = this;
    $rootScope.loginMode = true;
    vm.credentials = {};

    vm.login = function () {
      if (angular.isUndefined(vm.credentials.username) && angular.isUndefined(vm.credentials.password)) {
        log.error('authInvalid');
      } else {
        loginService.login(vm.credentials.username, vm.credentials.password)
          .then(function (response) {
            $scope.$on('serverResponse', function (scopeInstance, data) {
              $scope.data = data
            });

            if ($scope.data && $scope.data.status !== 401) {
              $rootScope.loginMode = false;
              $state.go('home');
              log.success('authSuccess');
            } else {
              if (response && response.detail) {
                log.error(response.detail);
              } else {
                log.error('authInvalid');
              }

            }
          })
          .catch(function (reason) {
            $rootScope.loginMode = true;
            if (reason && reason.detail) {
              log.error(reason.detail);
            } else if (reason) {
              log.error('authInvalid');
            }
          })
      }
    }


  });
