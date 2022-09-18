import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { newEmployee } from './home/newEmployee/newEmployee.component';
import { EmployeesComponent } from './home/employees/employees.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './home/profile/profile.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterationComponent } from './user/registeration/registeration.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard],
  children: [
    { path: '', redirectTo: '/home/profile', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent },
    { path: 'employees', component: EmployeesComponent },
    { path: 'newEmployee', component: newEmployee }
  ]
 },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: '', redirectTo: '/user/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'registeration', component: RegisterationComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
