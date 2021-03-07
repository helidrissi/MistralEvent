import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '../account/account.component';
import { CreditComponent } from '../credit/credit.component';
import { AgendaComponent } from '../agenda/agenda.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'account', component: AccountComponent },
      { path: 'credit', component: CreditComponent },
      { path: 'agenda', component: AgendaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class HomeRoutingModule {}
