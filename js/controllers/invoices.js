angular.module('jsinvoices.controllers')

.controller('InvoicesController', [
  '$scope', '$location', '$filter','jsInvoicesServer'
  , function($scope, $location, $filter, jsInvoicesServer) {

  $scope.invoices = [];
  $scope.customers = [];

  var init = function() {

    //show loading

    jsInvoicesServer.getCustomers().then(function(customers) {
      $scope.customers = customers;
    });

    jsInvoicesServer.getInvoices().then(function(invoices) {
      angular.forEach(invoices, function (invoice) {
        var customer = $filter('filter')($scope.customers, {id: invoice.customer_id}, true);
        invoice.customer = customer.pop(); // ids are unique
      });

      $scope.quantity = Object.keys(invoices).length;
      $scope.invoices = invoices;
      //hide loading
    });
  };

  $scope.goToInvoice = function(invoiceId){
    $location.path('/invoices/'+invoiceId);
  };

  $scope.goToNewInvoice = function(){
    $location.path('/invoices/new');
  };

  init();

}]);
