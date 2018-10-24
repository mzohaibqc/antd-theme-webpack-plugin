export default {
  hash: true,
  entry: 'src/index.js',
  disableCSSModules: false,
  ignoreMomentLocale: true,
  autoprefixer: {
    browsers: [
      '> 1%',
      'IE >= 9',
      'last 2 versions'
    ]
  },
  define: {
    'process.env.NODE_ENV': (process.env.NODE_ENV === 'production') ? 'production' : 'development'
  },
  extraBabelPlugins: [
    'transform-runtime',
    ['import', {
      libraryDirectory: 'es',
      libraryName: 'antd',
      style: true
    }]
  ],
  env: {
    production: {
      multipage: true,
      publicPath: '/dva-antd-starter/'
    },
    development: {
      multipage: false,
      publicPath: '/',
      extraBabelPlugins: [
        'dva-hmr'
      ]
    }
  }
};
