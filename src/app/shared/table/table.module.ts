import { NgModule } from '@angular/core';
import { SharedSimpleTableComponent } from './table.component';
import { MaterialModules } from '../material-module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesBarrelModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    MaterialModules,
    CommonModule,
    FormsModule,
    PipesBarrelModule
  ],

  exports: [
    SharedSimpleTableComponent
  ],

  declarations: [
    SharedSimpleTableComponent
  ],

  providers: [],
})
export class SharedTableModule { }
