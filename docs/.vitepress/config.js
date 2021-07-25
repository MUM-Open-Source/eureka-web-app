const path = require('path');

module.exports = {
    title: 'Eureka Developer Docs',
    // scss: {
    //     prependData: `
    //         @import ../../../src/common/styles/global.scss";
    //       `,
    // },
    // pluginOptions: {
    //     'style-resources-loader': {
    //         preProcessor: 'scss',
    //         patterns: [
    //             path.resolve(__dirname, './src/common/styles/global.scss'),
    //         ],
    //     },
    // },
    themeConfig: {
        // displayAllHeaders: true,
        // search: true,
        nav: [
            { text: 'Guide', link: '/' },
            {
                text: 'GitHub',
                link: 'https://github.com/MUM-Open-Source/eureka-web-app',
            },
        ],
        // sidebar: 'auto',
    },
};
