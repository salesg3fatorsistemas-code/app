import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Pessoas } from './cadastro/pessoas/pessoas';
import { Menu } from './menu/menu';
import { Categorias } from './cadastro/categorias/categorias';
import { Produtos } from './cadastro/produtos/produtos';

export const routes: Routes = [
    {path: ':alias/login', component: Login},
    {path: ':alias', component: Menu, children: [
        {path: 'dashboard', component: Dashboard},
        {path: 'pessoas', component: Pessoas},
        {path: 'categorias', component: Categorias},
        {path: 'produtos', component: Produtos}
    ]}
    
    
];
