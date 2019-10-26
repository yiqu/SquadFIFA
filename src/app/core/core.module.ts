import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../shared/material-module';
import { FeedComponent } from './feed/feed.component';
import { PipesBarrelModule } from '../shared/pipes/pipes.module';

@NgModule({
  imports: [
    RouterModule,
    MaterialModules,
    PipesBarrelModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],

  exports: [
    
  ],

  declarations: [
    CoreComponent,
    FeedComponent
  ],

  providers: [],
})
export class CoreModule { }
