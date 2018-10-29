'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost:8080/"'
  BASE_API: '"http://150.109.180.66:8000/"'
  // BASE_API: '"https://easy-mock.com/mock/5bb8889dff7cf8702e6ac4d4/hb"'
})
