import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreComponent } from './core.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from '../shared/material-module';
import { FeedComponent } from './feed/feed.component';
import { PipesBarrelModule } from '../shared/pipes/pipes.module';
import { EditSeasonComponent } from './edit/edit.component';
import { CoreSideNavComponent } from './side-nav/side-nav.component';
import { FeedSeasonComponent } from './feed/season/season.component';
import { DirectivesModule } from '../shared/directives/directives.module';
import { SingleSeasonComponent } from './feed/season/types/single.component';
import { PvpSeasonComponent } from './feed/season/types/pvp.component';
import { SeasonDirective } from './feed/season/directives/season.dir';
import { InfoBarComponent } from './feed/season/types/info-bar/info.component';
import { GamesComponent } from './feed/season/types/games/games.component';

@NgModule({
  imports: [
    RouterModule,
    MaterialModules,
    PipesBarrelModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ],

  exports: [
  ],

  declarations: [
    CoreComponent,
    FeedComponent,
    EditSeasonComponent,
    CoreSideNavComponent,
    FeedSeasonComponent,
    SeasonDirective,
    SingleSeasonComponent,
    PvpSeasonComponent,
    InfoBarComponent,
    GamesComponent
  ],

  providers: [],

  entryComponents: [ 
    SingleSeasonComponent, 
    PvpSeasonComponent 
  ],
})
export class CoreModule { }
