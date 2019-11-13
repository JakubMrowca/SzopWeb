import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationState } from './state/ApplicationState';
import { LoginComponent } from './login/login.component';
import { WebApiUsers } from './users/WebApiUsers';
import { EventEmiter } from './helpers/EventEmiter';
import { SignalREventEmiter } from './helpers/SignalREventEmiter';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from './state/AuthService';
import { WebApiNotify } from './notify/WebApiNotify';
import { RequestInterceptor } from './state/request.interceptor';
import { WebApiWork } from './work/WebApiWork';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true
  },ApplicationState,WebApiUsers, EventEmiter,SignalREventEmiter,AuthService,WebApiWork,WebApiNotify],
  bootstrap: [AppComponent]
})
export class AppModule { }
