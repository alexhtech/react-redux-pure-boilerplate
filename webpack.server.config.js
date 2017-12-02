// webpack server config

const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = require('./webpack.common.config')


// set entry point
config.entry = [
    'babel-polyfill',
    './server/server.js'
]

// output
config.output.path = path.resolve(__dirname, 'build')
config.output.filename = 'server.js'

// set the node application
config.target = 'node'


config.module.rules.push({
    test: /\.(css|sass|scss)/,
    use: ExtractTextPlugin.extract({
            use: 'css-loader!sass-loader'
        }
    )
})

config.plugins.push(new ExtractTextPlugin('style.css'))


// rewrite additional plugins to JS/JSX files
config.module.rules[0].use.options.env.development.plugins = []

const isExternal = (request) => {
    if (request.indexOf('.') !== -1) {
        return true
    }

    const {alias} = config.resolve
    for (const key in alias) {
        if (Object.prototype.hasOwnProperty.call(alias, key)) {
            return request.split('/').indexOf(key) !== -1
        }
    }

    return false
}

// remove from server.js all common dependencies
config.externals = [
    (context, request, callback) => {
        if (isExternal(request)) {
            return callback()
        }
        return callback(null, `commonjs ${request}`)
    }
]


config.node = {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
}


module.exports = config
