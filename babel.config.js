/* eslint-env node */

module.exports = (api) => ({
  presets: ['next/babel'],
  plugins: api.env('production') ? ['transform-remove-console'] : []
})
