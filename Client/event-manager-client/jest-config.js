const config = {
    preset: 'react-native',
    verbose: true,
    collectCoverage: true,
    moduleDirectories: ['node_modules', 'src'],
    globals: {
        'ts-jest': {
            babelConfig: true,
            isolatedModules: true,
        },
    },
    transformIgnorePatterns: ["node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?)/)"],
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest",
        "^.+\\.(js?)$": "babel-jest"
    },
};

module.exports = config;

// Or async function
module.exports = async () => {
    return {
        verbose: true,
    };
};