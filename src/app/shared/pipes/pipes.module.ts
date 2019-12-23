import { NgModule } from '@angular/core';
import { RecordCountPipe } from './record.pipe';
import { TeamNamePipe } from './team-name.pipe';
import { UserDisplayPipe, UserIconDisplayPipe } from './user-name.pipe';
import { DateDisplayPipe } from './date-display.pipe';
import { GameSortDisplayPipe } from './sort.pipe';

@NgModule({
  imports: [],
  exports: [
    RecordCountPipe,
    TeamNamePipe,
    UserDisplayPipe,
    DateDisplayPipe,
    UserIconDisplayPipe,
    GameSortDisplayPipe
  ],

  declarations: [
    RecordCountPipe,
    TeamNamePipe,
    UserDisplayPipe,
    DateDisplayPipe,
    UserIconDisplayPipe,
    GameSortDisplayPipe
  ],

  providers: [],
})
export class PipesBarrelModule { }
