import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  exports: [
    
  ],

  declarations: [
    AdminComponent
  ],

  providers: [

  ],
})
export class AdminModule { }
