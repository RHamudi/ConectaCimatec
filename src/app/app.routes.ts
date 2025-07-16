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
    }
];
