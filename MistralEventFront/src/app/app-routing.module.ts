import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLocationComponent } from './components/create-location/create-location.component';
import { CreateEventComponent } from './components/create-event/create-event.component';

import { AuthGuard } from './guards/auth.guard';
import { AfterAuthGuard } from './guards/after-auth.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AfterAuthGuard] },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
  },
  { path: 'create-location', component: CreateLocationComponent },
  { path: 'create-event', component: CreateEventComponent},
  //{ path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
