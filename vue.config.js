const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve(dir) {
    return path.join(__dirname, dir)
}

function isProd(){
    return process.env.NODE_ENV === 'production' ? true : false
}

const HtmlWebpackInlinePlugin = require('html-webpack-inline-plugin');
const port = process.env.port || process.env.npm_config_port || 8083 // dev port
module.exports = {
    publicPath: './',
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        port: port,
        proxy: {
            '/traffic': {
                target: process.env.VUE_APP_BASE_API,
                ws: false,
                pathRewrite: {
                    '^/traffic': '/traffic'
                }
            },
            '/bus': {
                target: process.env.VUE_APP_BASE_API,
                ws: false,
                pathRewrite: {
                    '^/traffic': '/bus'
                }
            },
            '/alarm': {
                target: process.env.VUE_APP_BASE_API,
                ws: false,
                pathRewrite: {
                    '^/traffic': '/alarm'
                }
            },
            '/openMQListen': {
                target: process.env.VUE_APP_BASE_API,
                ws: false,
                pathRewrite: {
                    '^/openMQListen': '/openMQListen'
                }
            },
            '/closeMQListen': {
                target: process.env.VUE_APP_BASE_API,
                ws: false,
                pathRewrite: {
                    '^/closeMQListen': '/closeMQListen'
                }
            },
            '/permit': {
                target: process.env.VUE_APP_BASE_API,
                ws: false,
                pathRewrite: {
                    '^/permit': '/permit'
                }
            },
            '/beach': {
                target: process.env.VUE_APP_BASE_API,
                ws: false,
                pathRewrite: {
                    '^/beach': '/beach'
                }
            },
            '/gov': {
                target: process.env.VUE_APP_BASE_API,
                ws: false,
                pathRewrite: {
                    '^/gov': '/gov'
                }
            },
            '/bjca': {
                target: process.env.VUE_APP_BASE_API,
                ws: false,
                pathRewrite: {
                    '^/bjca': '/bjca'
                }
            },
        }
    },
    pluginOptions: {
        foo: 'foo'
    },
    configureWebpack: {
        devtool: 'souce-map',
        // devtool: 'cheap-module-source-map',
        plugins: [
            new HtmlWebpackInlinePlugin({
                compress: false
            }),
            // new BundleAnalyzerPlugin()
        ]
    },
    chainWebpack(config) {
        config.plugin('html').tap(args => {
            // if(process.env.VUE_APP_BASE_API.indexOf('http://172.21.112.65:8083') !== -1){ //演示环境
            //     args[0].mapUrl = 'http://10.146.1.53:9018'
            //     args[0].mapFileName = 'LongMap1'
            // }else {
            //     //生产环境
            //     args[0].mapUrl = 'http://172.21.112.113:9018'
            //     args[0].mapFileName = 'LongMap'
            // }
            return args;
        })

        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10240 * 2 }))

        // const fileRule = config.module.rule('file')
        // fileRule.uses.clear()
        //   fileRule
        //     .test(/\.swf$/)
        //     // .exclude.add(path.resolve(__dirname, '@/assets/video'))
        //     // .end()
        //     .use('file-loader')
        //     .loader('file-loader')

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config.optimization.splitChunks({
                        chunks: 'all',
                        cacheGroups: {
                            libs: {
                                name: 'chunk-libs',
                                test: /[\\/]node_modules[\\/]/,
                                priority: 10,
                                chunks: 'initial' // only package third parties that are initially dependent
                            },
                            elementUI: {
                                name: 'chunk-elementUI', // split elementUI into a single package
                                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                            },
                            avue: {
                                name: 'chunk-avue',
                                priority: 18,
                                test: /[\\/]node_modules[\\/]_?@smallwei(.*)/
                            },
                            betterScroll: {
                                name: 'chunk-betterScroll',
                                priority: 16,
                                test: /[\\/]node_modules[\\/]_?better-scroll(.*)/
                            },
                            commons: {
                                name: 'chunk-commons',
                                test: resolve('src/components'), // can customize your rules
                                minChunks: 2, //  minimum common number
                                priority: 5,
                                reuseExistingChunk: true
                            }
                        }
                    })
                    config.optimization.minimize(true)
                    config.optimization.minimizer = [
                        new TerserPlugin({
                            cache: true,
                            parallel: true,
                            sourceMap: true, // 如果在生产环境中使用 source-maps，必须设置为 true
                            terserOptions: {
                                compress: {
                                    drop_console: true
                                }
                            }
                        }),
                    ]
                    config.optimization.runtimeChunk('single')
                })
    }
}
