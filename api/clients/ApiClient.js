const RETRYABLE_HTTP_STATUSES = [502, 503, 504];
const MAX_ATTEMPTS = 5;
const BACKOFF_MS = 700;

/**
 * Thin wrapper over Playwright's APIRequestContext.
 *
 * The AUT quirks are handled here once so tests stay clean:
 *  - the HTTP status is always 200; the real status is `responseCode` in the body
 *  - the body is JSON but served as text/html, so response.json() cannot be used
 *  - the public host occasionally answers 5xx, so those calls are retried
 */
class ApiClient {
  constructor(request) {
    this.request = request;
  }

  async send(method, path, { form, params } = {}) {
    let response;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      response = await this.request.fetch(path, { method, form, params });
      if (!RETRYABLE_HTTP_STATUSES.includes(response.status())) break;
      await new Promise((resolve) => setTimeout(resolve, BACKOFF_MS * attempt));
    }

    const text = await response.text();
    let body;
    try {
      body = JSON.parse(text);
    } catch {
      throw new Error(
        `${method} ${path}: expected JSON but got HTTP ${response.status()}: ${text.slice(0, 200)}`,
      );
    }

    return {
      httpStatus: response.status(),
      status: body.responseCode,
      message: body.message,
      body,
    };
  }

  get(path, options) {
    return this.send('GET', path, options);
  }
  post(path, options) {
    return this.send('POST', path, options);
  }
  put(path, options) {
    return this.send('PUT', path, options);
  }
  delete(path, options) {
    return this.send('DELETE', path, options);
  }
}

module.exports = ApiClient;
