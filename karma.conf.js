var path = require('path');



/**
 *
 */
module.exports = function(config) {
	config.set({
		files: [
			// On charge les styles car le framework de test
			// effecture des tests de visibilité qui en dépendent.
			'node_modules/bootstrap/dist/css/bootstrap.css',
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
