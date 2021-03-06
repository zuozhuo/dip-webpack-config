/**
 * Created by zuozhuo on 2017/5/9.
 */


import * as loaders from './loaders';
import {getDataFromEnv, isProductionEnv} from './utils';
import {ENV_TYPES} from './consts';
import {getService, SERVICE_NAMES} from './bottle';


const moduleSassLoaderChain = () => {
    const dipConfig = getService(SERVICE_NAMES.dipConfig);
    let localIdentName = '[path]--[name]-[ext]__[local]';
    if (dipConfig.hash) {
        localIdentName = isProductionEnv() ? '[hash:base64]' : '[path]--[name]-[ext]__[local]-[hash:base64:5]';
    }

    return getDataFromEnv([
        loaders.cssLoaderCreator({
            autoprefixer: false,
            restructuring: false,
            importLoaders: 1,
            modules: true,
            localIdentName,
        }),
        loaders.postCssLoaderCreator(),
        loaders.resolveUrlLoaderCreator(),
        loaders.sassLoaderCreator(),
    ]);
};

const cssLoaderChain = () => {
    return getDataFromEnv([
        loaders.cssLoaderCreator({
            autoprefixer: false,
            restructuring: false,
        }),
        loaders.postCssLoaderCreator(),
    ]);
};

const styleLoaderChain = () => {
    return getDataFromEnv([
        loaders.styleLoaderCreator(),
    ]);
};

const sassLoaderChain = () => {
    return getDataFromEnv([
        ...cssLoaderChain(),
        loaders.resolveUrlLoaderCreator(),
        loaders.sassLoaderCreator(),
    ]);
};

const htmlLoaderChain = () => getDataFromEnv([
    loaders.htmlLoaderCreator(),
]);

const externalHtmlLoaderChain = () => getDataFromEnv([
    loaders.fileLoaderCreator(),
    loaders.extractLoaderCreator(),
    loaders.htmlLoaderCreator(),
]);

const jsLoaderChain = () => getDataFromEnv([
    loaders.babelLoaderCreator(),
], {
    [ENV_TYPES.development]: [
        // react-hot-loader这个已经挪到babelrc中了
        // loaders.reactHotLoaderCreator(),
        loaders.babelLoaderCreator(),
    ],
    [ENV_TYPES.production]: [
        loaders.babelLoaderCreator(),
    ],
});

const tsLoaderChain = () => getDataFromEnv([
    loaders.babelLoaderCreator(),
    loaders.tsLoaderCreator(),
], {
    [ENV_TYPES.development]: [
        // react-hot-loader这个已经挪到babelrc中了
        // loaders.reactHotLoaderCreator(),
        loaders.babelLoaderCreator(),
        loaders.tsLoaderCreator(),
    ],
    [ENV_TYPES.production]: [
        loaders.babelLoaderCreator(),
        loaders.tsLoaderCreator(),
    ],
});


const fileUrlLoaderChain = () => getDataFromEnv([
    loaders.urlLoaderCreator(),
]);

const eslintLoaderChain = () => getDataFromEnv([
    loaders.eslintLoaderCreator(),
]);


export {
    moduleSassLoaderChain,
    cssLoaderChain,
    styleLoaderChain,
    sassLoaderChain,
    htmlLoaderChain,
    externalHtmlLoaderChain,
    jsLoaderChain,
    tsLoaderChain,
    fileUrlLoaderChain,
    eslintLoaderChain,
};
