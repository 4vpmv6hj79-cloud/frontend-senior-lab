/**
 * Production environment configuration.
 *
 * Replace the Firebase values below with your project's config
 * from the Firebase Console > Project Settings > Web App.
 *
 * If you don't have Firebase configured, set `useFirebase: false`
 * to run in demo mode (local auth + localStorage).
 */
export const environment = {
  production: true,
  useFirebase: false, // Set to true once you configure Firebase
  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  },
};
