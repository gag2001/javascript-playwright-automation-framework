require('dotenv').config({ quiet: true });

// Single source of truth for environment settings; no other file reads process.env.
module.exports = {
  baseUrl: process.env.BASE_URL || 'https://automationexercise.com',
  apiUrl: process.env.API_URL || 'https://automationexercise.com/api',
  isCI: Boolean(process.env.CI),
};
