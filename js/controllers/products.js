angular.module('jsinvoices.controllers')

.controller('ProductsController', [
  '$scope', '$location', '$filter','jsInvoicesServer'
  , function($scope, $location, $filter, jsInvoicesServer) {

  $scope.products = [];
  $scope.quantity = 0;

  var init = function() {

    //show loading

    jsInvoicesServer.getProducts().then(function(products) {
      $scope.products = products;
      $scope.quantity = Object.keys(products).length;
      //hide loading
    }, onFailure);
  };

  $scope.goToProduct = function(productId){
    $location.path('/products/'+productId);
  };

  var onFailure = function () {
    alert('An error ocurried.');
  }

  init();

}]);
