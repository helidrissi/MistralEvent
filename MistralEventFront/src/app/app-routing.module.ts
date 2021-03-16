import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLocationComponent } from './components/create-location/create-location.component';
import {CreateEventComponent} from './components/create-event/create-event.component'

const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  {
    path: 'home',
    // canActivate: [ProtectedGuard],
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
  },
  { path: 'create-location', component: CreateLocationComponent },
  { path: 'create-event', component: CreateEventComponent}
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
