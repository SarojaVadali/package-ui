import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import{ConfirmationPopoverModule} from 'angular-confirmation-popover';

import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar'; 

// Fontawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PackagesComponent } from './packages/packages.component';
import { PackagedialogComponent } from './packagedialog/packagedialog.component';
import { PackageapiService } from './services/packageapi.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,    
    PackagesComponent,    
    PackagedialogComponent    
  ],
  entryComponents:[PackagedialogComponent],
  imports: [
    BrowserModule,
    //NgModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType:'danger' //set defaults here
    }),
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,   
    FontAwesomeModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  providers: [DatePipe,PackageapiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
