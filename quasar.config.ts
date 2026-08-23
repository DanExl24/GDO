import { configure } from 'quasar/wrappers';

export default configure(() => {
  return {
    boot: [
      'pinia',
      'sqlite',
      'network',
    ],

    css: [
      'app.scss',
    ],

    extras: [
      'roboto-font',
      'material-icons',
    ],

    build: {
      target: {
        browser: ['es2022', 'chrome100', 'firefox100', 'safari15'],
        node: 'node20',
      },
      vueRouterMode: 'hash',
      env: {
        API_URL: process.env.API_URL || process.env.VITE_API_URL || 'https://api-gdo.adsoproject.dev',
      },
    },

    devServer: {
      open: false,
    },

    framework: {
      config: {
        dark: true,
        brand: {
          primary: '#00BCD4',
          secondary: '#26A69A',
          accent: '#9C27B0',
          dark: '#1D1D1D',
          'dark-page': '#121212',
          positive: '#4CAF50',
          negative: '#F44336',
          info: '#2196F3',
          warning: '#FF9800',
        },
      },
      plugins: [
        'Notify',
        'Dialog',
        'Loading',
        'LocalStorage',
      ],
    },

    animations: 'all',

    capacitor: {
      hideSplashscreen: true,
    },
  };
});
