const base = require('@playwright/test');
const ApiClient = require('../api/clients/ApiClient');
const UserService = require('../api/services/UserService');
const ProductService = require('../api/services/ProductService');
const { buildUser } = require('../utils/userFactory');

// Best-effort teardown: a flaky delete must not fail a test that already passed.
async function cleanup(userService, user) {
  try {
    await userService.deleteAccount(user);
  } catch (error) {
    console.warn(`Cleanup of ${user.email} failed: ${error.message}`);
  }
}

/**
 * Custom fixtures: each test gets fresh services and, when it asks for them,
 * its own user that is deleted afterwards (test isolation without shared data).
 */
const test = base.test.extend({
  apiClient: async ({ request }, use) => use(new ApiClient(request)),
  userService: async ({ apiClient }, use) => use(new UserService(apiClient)),
  productService: async ({ apiClient }, use) => use(new ProductService(apiClient)),

  // Unique user data that is not registered yet. Cleaned up even if the test created it.
  newUser: async ({ userService }, use) => {
    const user = buildUser();
    await use(user);
    await cleanup(userService, user);
  },

  // A user already registered through the API.
  registeredUser: async ({ userService }, use) => {
    const user = buildUser();
    const res = await userService.createAccount(user);
    if (res.status !== 201) throw new Error(`Fixture could not create user: ${res.message}`);
    await use(user);
    await cleanup(userService, user);
  },
});

module.exports = { test, expect: base.expect };
