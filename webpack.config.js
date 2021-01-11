const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin"); // для работы с html
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const loader = require("sass-loader");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log('isDev', isDev);

const filename = (ext) => {
    if (isDev) {
      return `[name].${ext}`
    };
    return `[name].[hash].${ext}`
};

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '',
            }
        },
        "css-loader",
    ];
    if (extra) {
        loaders.push(extra)
    }
    return loaders;
}

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all",
        },
    };
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }
    return config;
}

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: ['@babel/polyfill', './index.js'] ,
        analytics: "./analytics.js",
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, "dist"),
    },
    optimization: optimization(),
    devServer: {
        port: 8080,
        open: true,
        liveReload: false,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd // для минификации html 
            }
        }), // для работы с html
        new CleanWebpackPlugin(), // для очистки старых сгенерированных файлов в dist
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/favicon.ico"),
                    to: path.resolve(__dirname, "dist"),
                },
            ],
        }),
        new MiniCssExtractPlugin({ // для того чтобы файлы css хранились не в html файле, а в отдельном файле
            filename: filename('css'),
        }),
    ],
    resolve: {
        extensions: [".js", ".json"], // для расширений при импорте import post from 'post' !== 'post.js'
        alias: {
            "@models": path.resolve(__dirname, "src/models"),
            "@": path.resolve(__dirname, "src"), // для указания alias путей
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ["file-loader"],
            },
            {
                test: /\.xml/,
                use: ["xml-loader"],
            },
            {
                test: /\.csv/,
                use: ["csv-loader"],
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader'),
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader'),
            },
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                      presets: ['@babel/preset-env'] // соответствие стандартам по умолчанию в babel
                    }
                }
            }
        ],
    },
};
