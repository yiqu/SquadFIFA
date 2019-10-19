import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { NotFoundComponent } from './404/not-found.component';
import { TeamsComponent } from './teams/teams.component';
import { PlayersComponent } from './players/players.component';
import { StatsComponent } from './stats/stats.component';
import { LogoutComponent } from './top-nav/logout/logout.component';
import { LogoutResolver } from './shared/resolvers/logout.resolver';
import { SelfComponent } from './self/self.component';
import { SelfGuard } from './shared/route-guards/self.guard';

const routes: Routes = [
  {
    path: 'home',
    component: CoreComponent
  },
  { path: 'about', 
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule) 
  },
  {
    path: 'players',
    component: PlayersComponent
  },
  {
    path: 'teams',
    component: TeamsComponent
  },
  {
    path: 'statistics',
    component: StatsComponent
  },
  {
    path: 'logout',
    component: LogoutComponent,
    resolve: {
      logout: LogoutResolver
    }
  },
  {
    path: 'self',
    component: SelfComponent,
    canActivate: [SelfGuard]
  },
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