const product = {
  type: 'object',
  required: ['id', 'name', 'price', 'brand', 'category'],
  properties: {
    id: { type: 'integer' },
    name: { type: 'string', minLength: 1 },
    price: { type: 'string', pattern: '^Rs\\. \\d+$' },
    brand: { type: 'string', minLength: 1 },
    category: {
      type: 'object',
      required: ['usertype', 'category'],
      properties: {
        usertype: {
          type: 'object',
          required: ['usertype'],
          properties: { usertype: { enum: ['Men', 'Women', 'Kids'] } },
        },
        category: { type: 'string', minLength: 1 },
      },
    },
  },
};

const productsResponse = {
  type: 'object',
  required: ['responseCode', 'products'],
  properties: {
    responseCode: { const: 200 },
    products: { type: 'array', items: product },
  },
};

const brandsResponse = {
  type: 'object',
  required: ['responseCode', 'brands'],
  properties: {
    responseCode: { const: 200 },
    brands: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'brand'],
        properties: { id: { type: 'integer' }, brand: { type: 'string', minLength: 1 } },
      },
    },
  },
};

module.exports = { productsResponse, brandsResponse };
