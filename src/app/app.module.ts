import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ContactService} from './service/contact/contact.service';
import { PageContentComponent } from './shared/page-content/page-content.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {AlertModule} from 'ngx-bootstrap/alert';
import {TabsModule} from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [
    AppComponent,
    PageContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    HttpClientModule,
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
      ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
