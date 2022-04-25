import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './components/main/login-form/login-form.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './core/material.module';
import { RegisterComponent } from './components/main/register/register.component';
import { DashboardComponent } from './components/other/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { dataTable } from './components/other/data-table/data-table.component';
import { MainService } from './services/main.service';
import { UserTableComponent } from './components/other/user-table/user-table.component';
import { DialogComponent } from './components/other/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterComponent,
    DashboardComponent,
    dataTable,
    UserTableComponent,
    DialogComponent,
  ],
  entryComponents: [DialogComponent],
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
  providers: [MainService],
  bootstrap: [AppComponent],
})
export class AppModule {}
