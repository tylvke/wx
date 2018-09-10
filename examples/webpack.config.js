/**
 * Created by wangshuo on 2017/2/12.
 */
var path = require('path');
var HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports = {
    entry: [path.resolve(__dirname, 'index.js')
    ],
    output: {
        path: path.resolve(__dirname,'build'),
        filename: 'index.js'
    },
    plugins: [new HtmlWebpackPlugin(
        {
            template:path.resolve(__dirname,'index.html')
        }
    )],
    watch: true

}