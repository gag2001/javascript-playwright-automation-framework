const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true, strict: false });

/** Returns { valid, errors } so tests can assert with a readable failure message. */
function validate(schema, data) {
  const check = ajv.compile(schema);
  const valid = check(data);
  return { valid, errors: valid ? [] : check.errors };
}

module.exports = { validate };
