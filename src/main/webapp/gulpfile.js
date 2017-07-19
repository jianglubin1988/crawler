/*
 * gulp + webpack 多应用构建配置
 * 命令加 -p 参数，开启压缩模式，如 gulp test -p
 * 命令加 -c 参数，删除构建目标目录
 * zhubaozong 2017-1-11
 */
var gulp = require("gulp");
var webpack = require("webpack");
var colors = require('colors');
var path = require('path');
var del = require('del');
var optimist = require("optimist"); //获取命令参数
var extractTextPlugin  = require("extract-text-webpack-plugin");
// 别名
var alias = {
	// jquery : path.join(__dirname,'./scripts/lib/jquery/2.2.0/jquery.min.js'),
	// jquery : path.join(__dirname,'./scripts/lib/jquery/3.0.0/jquery.min.js'),
	//	vue :  path.join(__dirname,'./scripts/lib/vue/1.0.24/vue.min.js')
};

//默认企业页面构建
gulp.task('default', function (){

	webpackTask({
		entry : {
			test:'./WEB-INF/_resource/admin/scripts/project/test.js'
		},
		dist : './WEB-INF/_dist'
	});

});

//webpack任务方法（自动提取依赖）
function webpackTask(options){

	if(optimist.argv.c){
		return del(options.dist);
	}

	webpack({
		entry : options.entry,
		output: {
			// path:  path.join(__dirname , '/application/dist'),
			path : options.dist,
			publicPath: './',//用于url-loader 生成的文件资源加入目录前缀
			filename: '[name].js'
		},

		module: {
			loaders: [
				{ test: /\.css$/, loader: extractTextPlugin.extract("style-loader", "css-loader")},
				// { test: /\.less$/, loader: extractTextPlugin.extract("style-loader","css-loader!less-loader")},
				{ test: /\.scss$/, loader: extractTextPlugin.extract("style-loader","css-loader!sass-loader")},

				{ test: /\.(jpe?g|png|gif)$/, loader: 'url-loader?limit=8192'},
				{ test: /\.woff(2)?(\?.*)?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
				{ test: /\.(ttf|eot|svg)(\?.*)?$/, loader: "file-loader"},

				{ test: /\.vue$/, loader: 'vue'}

			]
		},

		watch: true,

		//其它解决方案配置
		resolve: {

			// root: [path.join(__dirname, "bower_components"), path.join(__dirname, "./src")]
			extensions: ['', '.js','.css','.less','.scss'], //用于指明程序自动补全识别哪些后缀
			alias: alias

		},

		//插件项
		plugins: [

			new webpack.optimize.CommonsChunkPlugin({name : 'common'}),
			new extractTextPlugin("[name].css"),

			// 把 jQuery 注册成全局变量，模块中可以不必使用 window.jQuery = window.$ = require('jquery');
			new webpack.ProvidePlugin({
				$ : 'jquery',
				jQuery : 'jquery',
				'window.jQuery': 'jquery'
			}),

			optimist.argv.p ? new webpack.optimize.UglifyJsPlugin({compress : {warnings: false } }):function(){}

		]

	}, function(err, stats) {

		//编译信息输出配置文件
		var outputOptions = {
			// colors: { level: 1, hasBasic: true, has256: false, has16m: false },
			colors : true,
			cached: false,
			cachedAssets: false,
			children : false,
			modules: false,//true 是否显示模块信息
			chunks: false,
			reasons: false,
			errorDetails: false,
			chunkOrigins: false,
			hash : false,
			version :false,
			time : false,
			exclude: [ 'node_modules', 'bower_components', 'jam', 'components','child' ]
		};

		console.log('\n= ['+(optimist.argv.p ? '压缩构建'.red : '快速构建'.green)+'] ==========================================================================\n'.white);
		console.log(stats.toString(outputOptions));
		console.log(('Output:'+stats.compilation.compiler.outputPath).grey);
		console.log(('Time:' +(stats.endTime - stats.startTime)+'ms\n\n').grey);


		//编译声音提示
		stats.compilation.errors.length?beep(3):beep(1);

    });
}

//哔哔哔
function beep(n)
{
	for(var i =0;i<n;i++)
	{
		process.stdout.write('\x07');
	}
}