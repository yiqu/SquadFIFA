import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelfComponent } from './self.component';
import { SelfGuard } from '../shared/route-guards/self.guard';
import { SelfCoreComponent } from './core/core.component';
import { SelfEditComponent } from './edit/edit.component';
import { SelfSeasonsComponent } from './seasons/seasons.component';

 //Root routes for app
const routes: Routes = [
  {
    path: '',
    component: SelfComponent,
    canActivate: [SelfGuard],
    //canActivateChild: [SelfChildrenGuard],
    children: [
      { path: '', component: SelfCoreComponent },
      { path: 'edit', component: SelfEditComponent },
      { path: 'seasons', component: SelfSeasonsComponent }
    ]
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
export class SelfRoutingModule { }
