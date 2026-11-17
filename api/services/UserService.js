class UserService {
  constructor(client) {
    this.client = client;
  }

  createAccount(user) {
    return this.client.post('createAccount', { form: user });
  }

  updateAccount(user) {
    return this.client.put('updateAccount', { form: user });
  }

  deleteAccount({ email, password }) {
    return this.client.delete('deleteAccount', { form: { email, password } });
  }

  verifyLogin(credentials) {
    return this.client.post('verifyLogin', { form: credentials });
  }

  getByEmail(email) {
    const params = email === undefined ? {} : { email };
    return this.client.get('getUserDetailByEmail', { params });
  }

  // Exposed so negative tests can hit an endpoint with an unsupported method.
  callWithMethod(method, path) {
    return this.client.send(method, path);
  }
}

module.exports = UserService;
