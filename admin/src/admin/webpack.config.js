'use strict'

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
module.exports = (config, webpack) => {
  // Note: we provide webpack above so you should not `require` it
  // Perform customizations to webpack config
  // Important: return the modified config


  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve?.fallback,
      util: require.resolve('util/')
    }
  }
  return config
}
