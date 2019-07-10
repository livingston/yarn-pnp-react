'use strict';

const path = require('path');
const webpack = require('webpack');

const PnPWebpackPlugin = require('pnp-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const safePostCssParser = require('postcss-safe-parser');
const postcssNormalize = require('postcss-normalize');

const cssRegex = /\.css$/;
const sassRegex = /\.(scss|sass)$/;

const APP_DIR = path.resolve(__dirname, '../src');
const BUILD_DIR = path.resolve(__dirname, '../dist');

const APP_INDEX = path.join(APP_DIR, 'index.js');
const APP_HTML = path.join(APP_DIR, 'index.html');

module.exports = function (webpackEnv) {
  const isProduction = webpackEnv === 'production';

  const publicPath = '/';

  return {
    mode: 'development',
    bail: true,
    devtool: 'cheap-module-source-map',

    entry: [
      'webpack-hot-middleware/client',
      APP_INDEX
    ],

    output: {
      path: BUILD_DIR,
      filename: '[name].bundle.[hash].js',
      publicPath: '/',
      sourceMapFilename: '[file].map',
      globalObject: 'this'
    },

    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
              parse: {
              ecma: 8
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true
            },
          },
          parallel: true,
          cache: true,
          sourceMap: true
        }),

        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: {
              inline: false,
              annotation: true
            }
          }
        })
      ],
      runtimeChunk: true
    },

    resolve: {
      alias: {
        'react-dom': require.resolve('@hot-loader/react-dom')
      },
      plugins: [
        PnPWebpackPlugin
      ]
    },

    resolveLoader: {
      plugins: [
        PnPWebpackPlugin.moduleLoader(module)
      ]
    },

    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },

        {
          test: /\.(js|jsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                eslintPath: require.resolve('eslint')
              },
              loader: require.resolve('eslint-loader')
            }
          ],
          include: APP_DIR
        },

        {
          oneOf: [
            {
              test: /\.(js|jsx)$/,
              include: APP_DIR,
              loader: require.resolve('babel-loader')
            },

            {
              test: cssRegex,
              use: [
                require.resolve('style-loader'),
                require.resolve('css-loader'),

              ],
              sideEffects: true
            },

            {
              test: sassRegex,
              use: [
                require.resolve('style-loader'),
                require.resolve('css-loader'),
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      require('postcss-preset-env')({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                      postcssNormalize()
                    ],
                    sourceMap: !isProduction
                  }
                }
              ],
              sideEffects: true
            },

            {
              loader: require.resolve('file-loader'),
              exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/]
            }
          ]
        }
      ]
    },

    plugins: [
      new ErrorOverlayPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
        inject: true,
        template: APP_HTML,
      })
    ]
  };
}
