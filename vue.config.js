const Dotenv = require('dotenv-webpack');

module.exports = {
    configureWebpack: {
        plugins: [
            new Dotenv({ defaults: true })
        ]
    }
}
