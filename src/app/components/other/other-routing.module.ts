import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dataTable } from '../other/data-table/data-table.component';
import { UserTableComponent } from '../other/user-table/user-table.component';
import { DashboardComponent } from '../other/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'datatable', component: dataTable },
  { path: 'usertable', component: UserTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherRoutingModule {}
