/**
 * Development environment configuration.
 *
 * When `useFirebase` is false, the app uses local authentication
 * (localStorage + Web Crypto) and local storage for all data.
 *
 * Set `useFirebase: true` and fill in your Firebase config to enable
 * real authentication and cloud persistence.
 */
export const environment = {
  production: false,
  useFirebase: false,
  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  },
};
