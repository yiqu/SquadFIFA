import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { MaterialModules } from './shared/material-module';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundModule } from './404/not-found.module';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MaterialModules,
    CoreModule,
    NotFoundModule,
    AppRoutingModule
  ],

  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
