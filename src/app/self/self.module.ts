import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelfComponent } from './self.component';
import { SelfEditComponent } from './edit/edit.component';
import { SelfSeasonsComponent } from './seasons/seasons.component';
import { SelfCoreComponent } from './core/core.component';
import { MaterialModules } from '../shared/material-module';
import { PipesBarrelModule } from '../shared/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules,
    PipesBarrelModule,
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
