import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { RegisterComponent } from './components/main/register/register.component';
// import { DashboardComponent } from './components/main/dashboard/dashboard.component';
// import { LoginFormComponent } from './components/main/login-form/login-form.component';
// import { dataTable } from './components/main/data-table/data-table.component';
// import { UserTableComponent } from './components/main/user-table/user-table.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/main/main.module').then((m) => m.MainModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./components/other/other.module').then((m) => m.OtherModule),
  },
  // {
  //   path: 'register-form',
  //   loadChildren: () => import('').then((m) => m.RegisterComponent),
  // },
  // {
  //   path: 'datatable',
  //   loadChildren: () => import('').then((m) => m.dataTable),
  // },
  // {
  //   path: 'usertable',
  //   loadChildren: () => import('').then((m) => m.UserTableComponent),
  // },
  // {
  //   path: '**',
  //   redirectTo: '/',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
