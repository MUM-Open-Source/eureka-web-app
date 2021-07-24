const path = require('path');

module.exports = {
    title: 'Eureka Developer Docs',
    scss: {
        prependData: `
            @import "@/common/styles/global.scss";
          `,
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '../../src'),
            },
        },
    },
    themeConfig: {
        displayAllHeaders: true,
        search: true,
        nav: [
            { text: 'Guide', link: '/' },
            {
                text: 'GitHub',
                link: 'https://github.com/MUM-Open-Source/eureka-web-app',
            },
        ],
        sidebar: 'auto',
    },
};
