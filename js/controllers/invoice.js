angular.module('jsinvoices.controllers')

.controller('InvoiceController', [
  '$scope', '$filter', '$routeParams','jsInvoicesServer'
  , function($scope, $filter, $routeParams, jsInvoicesServer) {

  $scope.products = [];
  $scope.customers = [];
  $scope.customerId = false;
  $scope.invoice = false;
  $scope.invoiceItems = [];
  $scope.newProductId = 0;
  $scope.newQuantity = 1;

  var watches = [];

  var init = function() {

    //show loading

    jsInvoicesServer.getProducts().then(function(products) {
      $scope.products = products;
    }, onFailure);

    jsInvoicesServer.getCustomers().then(function(customers) {
      $scope.customers = customers;

      //hide loading
    }, onFailure);

    $scope.$watch(function(){ return $scope.customerId; }, onCustomerChange, true);
    $scope.$watch(function(){ return $scope.invoice; }, onInvoiceChange, true);

    if (typeof $routeParams.invoiceId !== 'undefined' && $routeParams.invoiceId !== null) {
      getInvoice($routeParams.invoiceId);
    }
  };

  var updateTotals = function (invoiceItems) {
    var total = 0;

    angular.forEach(watches, function (watch) {
      watch();
    });
    watches = [];

    angular.forEach(invoiceItems, function (invoiceItem) {
      if (typeof invoiceItem.product === 'undefined') {
        var product = $filter('filter')($scope.products, {id: invoiceItem.product_id}, true);
        invoiceItem.product = product.pop(); // ids are unique
      }
      invoiceItem.subTotal = Math.round(invoiceItem.quantity * invoiceItem.product.price * 100) / 100;
      total += invoiceItem.subTotal;
      watches.push($scope.$watch(function(){ return invoiceItem;}, onQuantityChange, true));
    });

    $scope.invoice.total = total - $scope.invoice.discount;
    $scope.invoiceItems = invoiceItems;
  }

  var getInvoice = function (invoiceId) {
    jsInvoicesServer.getInvoice(invoiceId).then(function (invoice) {
      $scope.invoice = invoice;
      $scope.customerId = invoice.customer_id;
      getInvoiceItems();
    }, onFailure);
  }

  var getInvoiceItems = function () {
    jsInvoicesServer.getInvoiceItems($scope.invoice.id).then(function (invoiceItems) {
      updateTotals(invoiceItems);
    }, onFailure);
  }

  var onQuantityChange =  function (newInvoiceItem, oldInvoiceItem) {
    if (newInvoiceItem != oldInvoiceItem) {
      if (newInvoiceItem.quantity <= 0) {
        //delete removeInvoiceItem
      } else {
        jsInvoicesServer.updateInvoiceItemQuantity(newInvoiceItem, newInvoiceItem.quantity).then( function () {
          updateTotals($scope.invoiceItems);
        }, onFailure);
      }
    }
  }

  var onInvoiceChange =  function (newInvoice, oldInvoice) {
    if (newInvoice !== oldInvoice && oldInvoice) { // not first change

      if (newInvoice.discount !== oldInvoice.discount) {
        updateTotals($scope.invoiceItems);
      } else {
        jsInvoicesServer.updateInvoice(newInvoice).then(function (invoice) {}, onFailure);
      }
    }
  }

  $scope.addProduct = function () {
    if ($scope.newProductId > 0 && $scope.newQuantity  > 0) {
      jsInvoicesServer.createInvoiceItem($scope.invoice.id
        , $scope.newProductId
        , $scope.newQuantity).then(function (product) {
          getInvoiceItems();
      }, onFailure);
    } else {
      alert('Please select a product, the quantity can\`t be 0');
      return;
    }
  }

  var onCustomerChange = function (newCustomer, oldCustomer) {
    if (newCustomer != oldCustomer) {
      if ($scope.invoice) {
        $scope.invoice.customer_id = $scope.customerId;
      } else {
        jsInvoicesServer.createInvoice($scope.customerId).then(function (invoice) {
          $scope.invoice = invoice;
        });
      }
    }
  }

  var onFailure = function () {
    alert('An error ocurried');
  }

  init();

}]);
