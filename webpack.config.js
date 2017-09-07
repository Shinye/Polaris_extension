var webpack = require('webpack');

module.exports = {
    entry: './src/js/main.js',
  // entry: ./src/js/main.js 파일을 가장 처음으로 읽습니다. 그리고 그 파일에서부터 import 된 파일들을 계속해서 읽어가면서 연결시켜줍니다.

    output: { // output: 읽은 파일을 모두 합쳐서 /dist/js/bundle.js 에 저장합니다.
        path: __dirname + '/dist/js/',
        filename: 'bundle.js'
    },

    module: { // module: 읽은 파일들을 babel-loader 를 통하여 ES6 스크립트를 컴파일해줍니다.
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            }
        ]
    },

    plugins: [ // plugins: UglifyJsPlugin 을 사용하여 컴파일한 스크립트를 minify 합니다.
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
