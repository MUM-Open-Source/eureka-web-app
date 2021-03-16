const path = require("path");

module.exports = {
    // global styles - make them accessible across the project
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "scss",
            patterns: [
                path.resolve(__dirname, "./src/common/styles/global.scss")
            ]
        }
    },
    // edit the title
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Eureka";
                return args;
            })
    }
}