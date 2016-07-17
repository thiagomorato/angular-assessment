angular.module('jsinvoices.controllers')

.controller('ProductController', [
  '$scope', 'jsInvoicesServer'
  , function($scope, jsInvoicesServer) {


  $scope.editing = false;

  $scope.edit = function() {
    $scope.editing = true;
  };

  $scope.save = function() {
    jsInvoicesServer.saveProduct($scope.product);
    $scope.editing = false;
  }


}]);
