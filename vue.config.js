module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
        ? '/bmi-calculator/'
        : './',
    outputDir: 'docs',
    assetsDir: './'
}