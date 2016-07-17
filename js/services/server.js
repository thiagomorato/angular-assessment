angular.module('jsinvoices.services').factory('jsInvoicesServer', [
  '$http', 'API_URL'
  , function($http, API_URL) {

  var getInvoices = function () {
    return $http.get(API_URL + 'api/invoices').then(function (response) {
      return response.data;
    });
  }

  var getInvoice = function (invoiceId) {
    return $http.get(API_URL + 'api/invoices/'+invoiceId).then(function (response) {
      return response.data;
    });
  }

  var getInvoiceItems = function (invoiceId, itemId) {
    return $http.get(API_URL + 'api/invoices/' + invoiceId + '/items' ).then(function (response) {
      return response.data;
    });
  }

  var createInvoice = function (customerId) {
    var data = {
      customer_id: customerId,
      discount: 0,
      total: 0
    };

    var endPoint = API_URL + 'api/invoices';

    return $http.post(endPoint, data).then(function (response) {
      return response.data;
    });
  }

  var updateInvoice = function (invoice) {
    var data = {
      customer_id: invoice.customerId,
      discount: invoice.discount,
      total: invoice.total
    };

    var endPoint = API_URL + 'api/invoices' + '/' + invoice.id;

    return $http.put(endPoint, data).then(function (response) {
      return response.data;
    });
  }

  var createInvoiceItem = function (invoiceId, productId, quantity) {
    var data = {
      invoice_id: invoiceId,
      product_id: productId,
      quantity: quantity
    };
    var endPoint = API_URL + 'api/invoices/' + invoiceId + '/items';

    return $http.post(endPoint, data).then(function (response) {
      return response.data;
    });
  }

  var updateInvoiceItemQuantity = function (invoiceItem, quantity) {
    var data = {
      quantity: quantity
    };
    var endPoint = API_URL + 'api/invoices/' + invoiceItem.invoice_id + '/items' + '/' + invoiceItem.id;
    return $http.put(endPoint, data).then(function (response) {
      return response.data;
    });
  }

  var removeInvoiceItem = function(invoiceItem) {
    var endPoint = API_URL + 'api/invoices/' + invoiceItem.invoice_id + '/items' + '/' + invoiceItem.id;
    return $http.delete(endPoint).then(function (response) {
      return response.data;
    });
  }

  var getProducts = function () {
    return $http.get(API_URL + 'api/products').then(function (response) {
      return response.data;
    });
  }

  var getProduct = function (productId) {
    return $http.get(API_URL + 'api/products/' + productId).then(function (response) {
      return response.data;
    });
  }

  var saveProduct = function (product) {
    data = {
      name: product.name,
      price: product.price
    };
    return $http.put(API_URL + 'api/products/' + product.id, data).then(function (response) {
      return response.data;
    });
  }

  var getCustomers = function () {
    return $http.get(API_URL + 'api/customers').then(function (response) {
      return response.data;
    });
  }

  return {
    getInvoices: getInvoices,
    getInvoice: getInvoice,
    getProducts: getProducts,
    getCustomers: getCustomers,
    createInvoice: createInvoice,
    updateInvoice: updateInvoice,
    createInvoiceItem: createInvoiceItem,
    updateInvoiceItemQuantity: updateInvoiceItemQuantity,
    getInvoiceItems: getInvoiceItems,
    removeInvoiceItem: removeInvoiceItem,
    saveProduct: saveProduct
  };

}]);
