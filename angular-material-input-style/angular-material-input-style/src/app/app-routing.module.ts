import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from 'src/components/login-form/login-form.component';

const routes: Routes = [{
  path: "login",
  //loadChildren: () => import('./main/job-application/job-application.module').then(m => m.JobApplicationModule)
  component: LoginFormComponent,
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
