/**
 * Created by zuozhuo on 2017/5/9.
 */
'use strict'
import Path from 'path';
import babelConfig from './babelConfig';
import {getDataFromEnv} from './utils'
import deepExtend from 'deep-extend';
import {getService, SERVICE_NAMES} from './bottle';
import postCssPlugins from './postCssPlugins'
/*
 - loaders
 - loaderChains
 - loaderRules
 */

function loaderCreator(originLoader) {
    return function (options) {
        return deepExtend({}, originLoader(), {options});
    }
}

const postCssLoader = () => getDataFromEnv({
    loader: 'postcss-loader',
    options: {
        sourceMap: true, // 只能设置 true | inline 不能设置false
        // TODO 将post-css的plugin加入到这里（autoPrefix、pxtorem等）
        plugins: postCssPlugins // 这里不能使用plugin属性，请在后面的 postcss 属性配置
        // parser: 'postcss-scss' // 如果需要使用 precss，需要设置这个parser
    }
});

const sassLoader = () => {
    const dipConfig = getService(SERVICE_NAMES.dipConfig);
    return getDataFromEnv({
        loader: 'sass-loader',
        options: deepExtend({}, dipConfig.loaderOptions.sassLoaderOption),
    });
};

const cssLoader = () => getDataFromEnv({
    loader: 'css-loader',
    options: {
        autoprefixer: false,
        restructuring: false,
    }
});

const styleLoader = () => getDataFromEnv({
    loader: 'style-loader',
    options: {}
});

const resolveUrlLoader = () => getDataFromEnv({
    loader: 'resolve-url-loader',
    options: {},
});

const urlLoader = () => getDataFromEnv({
    loader: 'url-loader',
    options: {
        limit: 1000,
        name: '[path][name].[hash:8].[ext]',
    },
});

const babelLoader = () => getDataFromEnv({
    loader: 'babel-loader',
    options: babelConfig,
});

const htmlLoader = () => getDataFromEnv({
    loader: 'html-loader',
    options: {
        ignoreCustomFragments: [
            /\{\{.*?\}\}/
        ],
        minimize: false,//开启html压缩后貌似编译报错,而且编译非常慢
        // 需要处理的图片和js\css的md5戳
        attrs: ['img:src', 'link:href', 'script:src'],
    }
});

const fileLoader = () => getDataFromEnv({
    loader: 'file-loader',
    options: {
        name: '[path][name].[hash:8].[ext]',
    }
});

const extractLoader = () => getDataFromEnv({
    loader: 'extract-loader',
    options: {},
});

// TODO Can't resolve 'react/lib/ReactMount' in '/Users/zuozhuo/workspace/zuozhuo/dip-webpack-config/test'
const reactHotLoader = () => getDataFromEnv({
    loader: 'react-hot-loader',
    options: {},
});

const eslintLoader = () => getDataFromEnv({
    loader: 'eslint-loader',
    options: {
        formatter: require('eslint-friendly-formatter')
    },
});

const postCssLoaderCreator = loaderCreator(postCssLoader);
const sassLoaderCreator = loaderCreator(sassLoader);
const cssLoaderCreator = loaderCreator(cssLoader);
const styleLoaderCreator  = loaderCreator(styleLoader);
const babelLoaderCreator = loaderCreator(babelLoader);
const resolveUrlLoaderCreator = loaderCreator(resolveUrlLoader);
const htmlLoaderCreator = loaderCreator(htmlLoader);
const fileLoaderCreator = loaderCreator(fileLoader);
const extractLoaderCreator = loaderCreator(extractLoader);
const reactHotLoaderCreator = loaderCreator(reactHotLoader);
const urlLoaderCreator = loaderCreator(urlLoader);
const eslintLoaderCreator = loaderCreator(eslintLoader);

export {
    postCssLoaderCreator,
    sassLoaderCreator,
    cssLoaderCreator,
    styleLoaderCreator,
    babelLoaderCreator,
    resolveUrlLoaderCreator,
    htmlLoaderCreator,
    fileLoaderCreator,
    extractLoaderCreator,
    reactHotLoaderCreator,
    urlLoaderCreator,
    eslintLoaderCreator,
}