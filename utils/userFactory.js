const { randomUUID } = require('node:crypto');

/** Builds a unique, valid user so tests never collide on the shared demo site. */
function buildUser(overrides = {}) {
  const id = randomUUID().slice(0, 8);
  return {
    name: `QA User ${id}`,
    email: `qa.${id}@example.com`,
    password: 'Passw0rd!123',
    title: 'Mr',
    birth_date: '15',
    birth_month: '6',
    birth_year: '1990',
    firstname: 'Test',
    lastname: `User${id}`,
    company: 'QA Corp',
    address1: '1 Test Street',
    address2: 'Suite 2',
    country: 'Canada',
    zipcode: '12345',
    state: 'Ontario',
    city: 'Toronto',
    mobile_number: '5551234567',
    ...overrides,
  };
}

module.exports = { buildUser };
