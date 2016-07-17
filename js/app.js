angular.module('jsinvoices', ['ngRoute', 'jsinvoices.controllers', 'jsinvoices.services'])

.constant('API_URL', 'http://localhost:8000/')

.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider

      .when('/invoices', {
        templateUrl: 'templates/invoices.html',
        controller: 'InvoicesController'
      })

      .when('/invoices/new', {
        templateUrl: 'templates/invoice.html',
        controller: 'InvoiceController'
      })

      .when('/invoices/:invoiceId', {
        templateUrl: 'templates/invoice.html',
        controller: 'InvoiceController'
      })

      .when('/products', {
        templateUrl: 'templates/products.html',
        controller: 'ProductsController'
      })

      .when('/products/new', {
        templateUrl: 'templates/product.html',
        controller: 'ProductController'
      })

      .when('/products/:invoiceId', {
        templateUrl: 'templates/product.html',
        controller: 'ProductController'
      })

      .otherwise({
        redirectTo: '/invoices'
      });
  }])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
  }]);


