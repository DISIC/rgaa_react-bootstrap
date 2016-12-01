var path = require('path');



/**
 *
 */
module.exports = function(config) {
	config.set({
		files: [
			'test/*.js'
		],
		frameworks: [
			'mocha'
		],
		reporters: [
			'mocha'
		],
		mochaReporter: {
			colors: {
				info: 'yellow'
			}
		},
		browsers: [
			'Chrome',
			'Firefox'
		],
		preprocessors: {
			'test/*.js': ['webpack']
		},
		webpack: {
			devtool: 'inline-source-map',
			module: {
				loaders: [
					{
						test: /\.js$/,
						loader: 'jsx-loader',
						include: [
							path.join(__dirname, 'src'),
							path.join(__dirname, 'test')
						]
					}
				]
			}
		}
	});
};
