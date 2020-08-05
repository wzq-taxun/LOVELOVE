const { override, fixBabelImports, addLessLoader, addWebpackExternals, addWebpackPlugin } = require('customize-cra');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const addCustomize = () => config => {
    if (process.env.NODE_ENV === 'production') {
        // 关闭sourceMap 不生成.map文件
        config.devtool = false;
        // 配置打包后的文件位置
        // config.output.path = __dirname + '../dist/demo/';
        // config.output.publicPath = './demo';
        // 添加js打包gzip配置
        config.plugins.push(
            new CompressionWebpackPlugin({
                test: /\.js$|\.html$|\.css$/,
                threshold: 10240,
                minRatio: 0.8,
                algorithm: "gzip",
            }),
        )
    }
    return config;
}
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
    addWebpackPlugin(
        new BundleAnalyzerPlugin({
            analyzerMode: 'static', //输出静态报告文件report.html，而不是启动一个web服务
        })
    ),
    addCustomize(),
    addWebpackExternals(
        {
            // 不做打包处理配置，如直接以cdn引入的
            'axios': 'window.axios'
        }
    ),
    // 判断环境，只有在生产环境的时候才去使用这个插件
    process.env.NODE_ENV === 'production' && addWebpackPlugin(new UglifyJsPlugin({
        uglifyOptions: {
            compress: {
                // drop_debugger: true,
                drop_console: true
            }
        }
    }))
);
