const userDetailResponse = {
  type: 'object',
  required: ['responseCode', 'user'],
  properties: {
    responseCode: { const: 200 },
    user: {
      type: 'object',
      required: ['id', 'name', 'email', 'first_name', 'last_name', 'country', 'city'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        email: { type: 'string' },
        title: { type: 'string' },
        birth_day: { type: 'string' },
        birth_month: { type: 'string' },
        birth_year: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        company: { type: 'string' },
        address1: { type: 'string' },
        address2: { type: 'string' },
        country: { type: 'string' },
        state: { type: 'string' },
        city: { type: 'string' },
        zipcode: { type: 'string' },
      },
    },
  },
};

module.exports = { userDetailResponse };
