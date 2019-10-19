import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelfComponent } from './self.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  exports: [
    
  ],

  declarations: [
    SelfComponent
  ],

  providers: [

  ],
})
export class SelfModule { }
