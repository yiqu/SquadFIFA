import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayersComponent } from './players.component';

 //Root routes for app
const routes: Routes = [
  { 
    path: '', 
    component: PlayersComponent, 
    data: {title: 'Players'},
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
export class PlayersRoutingModule { }
