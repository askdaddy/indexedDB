const path = require('path');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: 'source-map',

    entry: path.join(__dirname, './src/index.ts'),
    performance: {hints: 'warning'},
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: ['/node_modules/']
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
        new htmlPlugin()
    ],
    devServer: {
        writeToDisk: true,
        host: '0.0.0.0',
        port: 24000,
        publicPath: "/dist",
        contentBase: path.resolve(__dirname, "./dist")
    }
}
