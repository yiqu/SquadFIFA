import { NgModule } from '@angular/core';
import { RecordCountPipe } from './record.pipe';
import { TeamNamePipe } from './team-name.pipe';
import { UserDisplayPipe, UserIconDisplayPipe } from './user-name.pipe';
import { DateDisplayPipe } from './date-display.pipe';

@NgModule({
  imports: [],
  exports: [
    RecordCountPipe,
    TeamNamePipe,
    UserDisplayPipe,
    DateDisplayPipe,
    UserIconDisplayPipe
  ],

  declarations: [
    RecordCountPipe,
    TeamNamePipe,
    UserDisplayPipe,
    DateDisplayPipe,
    UserIconDisplayPipe
  ],

  providers: [],
})
export class PipesBarrelModule { }
