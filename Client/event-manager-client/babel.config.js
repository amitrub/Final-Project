module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
        '@babel/preset-react',
    ],
    env: {
      test: {
        plugins: ["@babel/plugin-transform-runtime"]
      }
    },
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.ios.js', '.android.js'],
          alias: {
            api: './src/api',
            assets: './src/assets',
            services: './src/services',
            styles: './src/styles',
            components: './src/components',
            app: './src',
          },
        },
      ],
      ['transform-class-properties'],
    ],
  };
};