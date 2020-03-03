module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                extensions: ['.tsx', '.ts'],
                alias: {
                    '@APIs': './src/APIs',
                    '@Config': './src/Config',
                    '@Navigation': './src/Navigation',
                    '@Store': './src/Store',
                    '@Screens': './src/UI/Screens',
                    '@Components': './src/UI/Components'
                }
            }
        ]
    ]
}
