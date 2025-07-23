import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home').then(m => m.Home)
    },
    {
        path: 'homeEmpresa',
        loadComponent: ()=> import('./features/home-empresa/home-empresa').then(m => m.HomeEmpresa)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login/login').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/register-user/register-user').then(m => m.RegisterUser)
    },
    {
        path: 'registerBusiness',
        loadComponent: () => import('./features/register-business/register-business').then(m => m.RegisterBusiness)
    },
    {
        path: 'publishedJobs',
        loadComponent: () => import('./features/published-jobs/published-jobs').then(m => m.PublishedJobs),
    },
    {
        path: 'registerNewJob',
        loadComponent: () => import('./features/register-new-job/register-new-job').then(m => m.RegisterNewJob)
    },
    {
        path: 'jobExplorer',
        loadComponent: () => import('./features/job-explorer/job-explorer').then(m => m.JobExplorer)
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/edit-profile/edit-profile').then(m => m.EditProfile)
    },
    {
        path: 'editJob/:id',
        loadComponent: () => import('./features/edit-job/edit-job').then(m => m.EditJob)
    }
];
