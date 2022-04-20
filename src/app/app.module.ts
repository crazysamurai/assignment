import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './core/material.module';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from './table-data.service';
import { dataTable } from './components/data-table/data-table.component';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { UserTableService } from './services/user-table.service';
import { UserTableComponent } from './components/user-table/user-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterComponent,
    DashboardComponent,
    dataTable,
    UserTableComponent,
  ],
  entryComponents: [],
  imports: [
    FormsModule,
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [PostService, UserService, AuthService, UserTableService],
  bootstrap: [AppComponent],
})
export class AppModule {}
