module.exports = {
    preset: "@vue/cli-plugin-unit-jest",  
    // Files which should be considered for resolving modules
    moduleFileExtensions: [
        'js',
        'json',
        'vue',
    ],
    // Configuring any required "Transpiler" tools
    transform: {
        '^.+\\.vue$': 'vue-jest',
        ".+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$": "jest-transform-stub"
    },
    globals: {
        'vue-jest': {
            transform: {
                'i18n': 'vue-i18n-jest'
            }, 
            testEnvironment: 'node',
        }
    }
}
  