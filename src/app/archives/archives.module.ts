import { NgModule } from '@angular/core';
import { ArchivesRoutingModule } from './archives-routing.module';
import { ArchivesComponent } from './archives.component';
import { MaterialModules } from '../shared/material-module';
import { SharedTableModule } from '../shared/table/table.module'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ArchivesRoutingModule,
    MaterialModules,
    SharedTableModule,
    CommonModule,
    FormsModule
  ],

  exports: [],

  declarations: [
    ArchivesComponent
  ],

  providers: [],
})
export class ArchivesModule { }
