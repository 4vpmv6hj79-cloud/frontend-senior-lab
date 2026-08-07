import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Frontend Senior Lab',
    loadComponent: () =>
      import(
        './features/landing/pages/landing-page/landing-page'
      ).then(({ LandingPage }) => LandingPage),
  },
  {
    path: 'login',
    title: 'Login | Frontend Senior Lab',
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page').then(
        ({ LoginPage }) => LoginPage,
      ),
  },
  {
    path: 'register',
    title: 'Register | Frontend Senior Lab',
    loadComponent: () =>
      import('./features/auth/pages/register-page/register-page').then(
        ({ RegisterPage }) => RegisterPage,
      ),
  },
  {
    path: 'diagnostic',
    title: 'Diagnostic | Frontend Senior Lab',
    loadComponent: () =>
      import(
        './features/diagnostic/pages/diagnostic-page/diagnostic-page'
      ).then(({ DiagnosticPage }) => DiagnosticPage),
  },
  {
    path: 'dashboard',
    title: 'Dashboard | Frontend Senior Lab',
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard-page/dashboard-page').then(
        ({ DashboardPage }) => DashboardPage,
      ),
  },
  {
    path: 'learning',
    title: 'Learning | Frontend Senior Lab',
    loadComponent: () =>
      import('./features/learning/pages/learning-page/learning-page').then(
        ({ LearningPage }) => LearningPage,
      ),
  },
  {
    path: 'interviews',
    title: 'Interviews | Frontend Senior Lab',
    loadComponent: () =>
      import(
        './features/interviews/pages/interviews-page/interviews-page'
      ).then(({ InterviewsPage }) => InterviewsPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
