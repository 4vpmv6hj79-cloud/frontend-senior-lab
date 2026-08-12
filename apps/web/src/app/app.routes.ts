import { Route } from '@angular/router';

import { authGuard, guestGuard } from './features/auth/guards/auth.guards';
import { diagnosticDeactivateGuard } from './features/diagnostic/guards/diagnostic-deactivate.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Frontend Senior Lab',
    loadComponent: () =>
      import('./features/landing/pages/landing-page/landing-page').then(
        ({ LandingPage }) => LandingPage,
      ),
  },
  {
    path: 'login',
    title: 'Login | Frontend Senior Lab',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page').then(
        ({ LoginPage }) => LoginPage,
      ),
  },
  {
    path: 'register',
    title: 'Register | Frontend Senior Lab',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/pages/register-page/register-page').then(
        ({ RegisterPage }) => RegisterPage,
      ),
  },
  {
    path: 'diagnostic',
    title: 'Diagnostic | Frontend Senior Lab',
    canDeactivate: [diagnosticDeactivateGuard],
    loadComponent: () =>
      import('./features/diagnostic/pages/diagnostic-page/diagnostic-page').then(
        ({ DiagnosticPage }) => DiagnosticPage,
      ),
  },
  {
    path: 'dashboard',
    title: 'Dashboard | Frontend Senior Lab',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard-page/dashboard-page').then(
        ({ DashboardPage }) => DashboardPage,
      ),
  },
  {
    path: 'learning',
    title: 'Learning | Frontend Senior Lab',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/learning/pages/learning-page/learning-page').then(
        ({ LearningPage }) => LearningPage,
      ),
  },
  {
    path: 'interviews',
    title: 'Interviews | Frontend Senior Lab',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/interviews/pages/interviews-page/interviews-page').then(
        ({ InterviewsPage }) => InterviewsPage,
      ),
  },
  {
    path: 'profile',
    title: 'Profile | Frontend Senior Lab',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/profile/pages/profile-page/profile-page').then(
        ({ ProfilePage }) => ProfilePage,
      ),
  },
  {
    path: '**',
    title: '404 | Frontend Senior Lab',
    loadComponent: () =>
      import('./features/not-found/pages/not-found-page/not-found-page').then(
        ({ NotFoundPage }) => NotFoundPage,
      ),
  },
];
