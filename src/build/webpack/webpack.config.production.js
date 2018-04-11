const webpackConfig = require('./webpack.config.global.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');

webpackConfig.plugins.push(
	new HtmlWebpackPlugin({
		template: './src/app/index.html',
		inject: 'body'
	})
);

webpackConfig.plugins.push(
	new UglifyJsPlugin({
		sourceMap: true,
		uglifyOptions: {
			mangle: {
				keep_classnames: true,
				keep_fnames: true
			},
			compress: {
				keep_fnames: true,
				keep_classnames: true
			}
		}
	})
);
// webpackConfig.plugins.push(
// 	new SriPlugin({
// 		hashFuncNames: ['sha256', 'sha384'],
// 		enabled: true
// 	})
// );

module.exports = webpackConfig;
