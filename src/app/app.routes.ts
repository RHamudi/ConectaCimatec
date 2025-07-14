import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/login/login').then(m => m.Login)
    },
    {
        path: 'cadastro',
        loadComponent: () => import('./features/register-user/register-user').then(m => m.RegisterUser)
    }
];
