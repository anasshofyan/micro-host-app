const {ModuleFederation} = require('webpack').container;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
    },
    output: {
        publicPath: 'auto',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
               {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new ModuleFederation({
            name: 'hostApp',
            filename: 'remoteEntry.js',
            remotes: {
                remote: 'remoteApp@http://localhost:3001/remoteEntry.js',
            },
            shared: ['react', 'react-dom'],
        }),
    ]
}