/* eslint-env node */

module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-url',
    [
      'postcss-preset-env',
      {
        stage: 1
      }
    ]
  ]
}
