import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { NotFoundComponent } from './404/not-found.component';
import { TeamsComponent } from './teams/teams.component';
import { StatsComponent } from './stats/stats.component';
import { LogoutComponent } from './top-nav/logout/logout.component';
import { LogoutResolver } from './shared/resolvers/logout.resolver';
import { SelfComponent } from './self/self.component';
import { SelfGuard, SelfChildrenGuard } from './shared/route-guards/self.guard';
import { SelfCoreComponent } from './self/core/core.component';
import { SelfEditComponent } from './self/edit/edit.component';
import { SelfSeasonsComponent } from './self/seasons/seasons.component';
import { FeedComponent } from './core/feed/feed.component';
import { EditSeasonComponent } from './core/edit/edit.component';

const routes: Routes = [
  {
    path: 'home',
    component: CoreComponent,
    children: [
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      { path: 'feed', component: FeedComponent },
      { path: 'edit', component: EditSeasonComponent }
    ]
  },
  { path: 'about', 
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule) 
  },
  { path: 'archives', 
    loadChildren: () => import('./archives/archives.module').then(m => m.ArchivesModule) 
  },
  {
    path: 'players',
    loadChildren: () => import ('./players/players.module').then(m => m.PlayersModule)
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
    loadChildren: () => import ('./self/self.module').then(m => m.SelfModule),
  },
  {
    path: '',
    redirectTo: '/home/feed',
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