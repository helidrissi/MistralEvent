import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { HomeRoutingModule } from './home-routing.module';
import { AgendaComponent } from '../agenda/agenda.component';
import { FooterComponent } from '../footer/footer.component';
import { CreditComponent } from '../credit/credit.component';
import { AccountComponent } from '../account/account.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomeComponent } from './home.component';
import { EventCardComponent } from '../EventCard/eventCard.component';
import { UpcomingEventsComponent } from '../upcomingEvents/upcomingEvents.component';
import { FileUploadComponent, FileUploadComponent as ModalComponent } from '../fileupload/fileupload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    AccountComponent,
    CreditComponent,
    FooterComponent,
    AgendaComponent,
    EventCardComponent,
    UpcomingEventsComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class HomeModule { }
