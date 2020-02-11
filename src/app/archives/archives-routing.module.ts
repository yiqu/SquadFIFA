import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArchivesComponent } from './archives.component';

 //Root routes for app
const routes: Routes = [
  { 
    path: '', 
    component: ArchivesComponent, 
    data: {title: 'Archives'},
  }
];


/**
 * Routing module.
 * 
 */
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ],
  
  declarations: []
})
export class ArchivesRoutingModule { }
