import { NgModule } from '@angular/core';
import { SharedSimpleTableComponent } from './table.component';
import { MaterialModules } from '../material-module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MaterialModules,
    CommonModule,
    FormsModule
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
