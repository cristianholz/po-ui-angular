import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { AboutComponent } from '../about/about.component';

const routes: Routes = [
  { path: 'list', component: UserListComponent },
  { path: 'create', component: AboutComponent },
  { path: 'edit/:id', component: AboutComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserListModule {}
