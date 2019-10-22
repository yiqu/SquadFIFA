import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelfComponent } from './self.component';
import { SelfEditComponent } from './edit/edit.component';
import { SelfSeasonsComponent } from './seasons/seasons.component';
import { SelfCoreComponent } from './core/core.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],

  exports: [
    
  ],

  declarations: [
    SelfComponent,
    SelfEditComponent,
    SelfSeasonsComponent,
    SelfCoreComponent
  ],

  providers: [

  ],
})
export class SelfModule { }
