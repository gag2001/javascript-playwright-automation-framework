class ProductService {
  constructor(client) {
    this.client = client;
  }

  getAllProducts() {
    return this.client.get('productsList');
  }

  getAllBrands() {
    return this.client.get('brandsList');
  }

  search(term) {
    const form = term === undefined ? {} : { search_product: term };
    return this.client.post('searchProduct', { form });
  }

  // Exposed so negative tests can hit an endpoint with an unsupported method.
  callWithMethod(method, path) {
    return this.client.send(method, path);
  }
}

module.exports = ProductService;
