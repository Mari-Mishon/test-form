module.exports = {
    css: {
        requiredModuleExtension: false,
        loaderOptions: {
            sass: {
                additionalData: '@import "~@/assets/styles.scss";'
            }
        }
    }
}