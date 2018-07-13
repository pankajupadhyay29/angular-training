import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { fakeBackendProvider } from './helpers/index';
import { AppComponent } from './app.component';
import { AlertService, AuthenticationService, UserService } from './services/index';

import { AlertComponent } from './directives/alert.component';
import { AuthGuard } from './guards/index';
import { JwtInterceptor } from './helpers/index';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    AlertComponent,
    TicketComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path: '', component: LoginComponent},
        {path: 'dashboard', component: DashboardComponent},
        { path: 'login', component: LoginComponent},
        { path: 'register', component: RegisterComponent},
        { path: 'ticket', component: TicketComponent},
        { path: 'admin', component: AdminComponent}
    ],
      { enableTracing: true },
    )
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
