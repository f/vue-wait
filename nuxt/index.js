/*
Nuxt.js module for vue-wait

Usage:
    - Install vue-wait package
    - Add this into your nuxt.config.js file:
    {
        modules: [
            // Simple usage
            'vue-wait/nuxt'

            // Optionally passing options in module configuration
            ['vue-wait/nuxt', { useVuex: true }]
        ],

        // Optionally passing options in module top level configuration
        wait: { useVuex: true }
    }
*/

const {resolve} = require('path');

module.exports = function nuxtVueWaitModule(moduleOptions) {
    const options = Object.assign({}, this.options.wait, moduleOptions);

    // Register plugin
    this.addPlugin({
        src: resolve(__dirname, 'vue-wait-plugin.template.js'),
        fileName: 'vue-wait-plugin.js',
        options: options
    })
};

// required by nuxt
module.exports.meta = require('../package.json');
