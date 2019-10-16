import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { NotFoundComponent } from './404/not-found.component';

const routes: Routes = [
  {
    path: 'home',
    component: CoreComponent
  },
  { path: 'about', 
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule) 
  },
  // {
  //   path: 'logout',
  //   component: LogoutComponent,
  //   resolve: {
  //     logout: LogoutResolver
  //   }
  // },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}