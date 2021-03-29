import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http'
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
import { CheckGroupComponent } from '../checkgroup/checkgroup.component';
import { UpcomingEventsComponent } from '../upcomingEvents/upcomingEvents.component';
import { FileUploadComponent, FileUploadComponent as ModalComponent } from '../fileupload/fileupload.component';
import { GalleryLocationComponent, GalleryLocationComponent as ModalComponent2 } from '../gallery-location/gallery-location.component';
import { PictureLocationComponent, PictureLocationComponent as ModalComponent3 } from '../picture-location/picture-location.component';
import { PictureGalleryLocationComponent } from '../picture-gallery-location/picture-gallery-location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {JwtInterceptor} from '../../services/jwt.interceptor';

import { CreateEventComponent } from '../create-event/create-event.component';
import { CreateLocationComponent } from '../create-location/create-location.component';


@NgModule({
  declarations: [
    HomeComponent,
    AccountComponent,
    CreditComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    AgendaComponent,
    EventCardComponent,
    CheckGroupComponent,
    UpcomingEventsComponent,
    FileUploadComponent,
    GalleryLocationComponent,
    CreateEventComponent,
    CreateLocationComponent,
    PictureGalleryLocationComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontAwesomeModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [/*{
    provide:HTTP_INTERCEPTORS,
    useClass:JwtInterceptor,
    multi:true,
  }*/
],
})
export class HomeModule { }
