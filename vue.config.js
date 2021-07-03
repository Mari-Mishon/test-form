module.exports = {
    css: {
        loaderOptions: {
            sass: {
                additionalData: '@import "~@/assets/styles.scss";'
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/test-form/'
        : '/',
    
    devtools: true,

}