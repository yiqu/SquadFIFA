import { NgModule } from '@angular/core';
import { RecordCountPipe } from './record.pipe';
import { TeamNamePipe } from './team-name.pipe';
import { UserDisplayPipe } from './user-name.pipe';
import { DateDisplayPipe } from './date-display.pipe';

@NgModule({
  imports: [],
  exports: [
    RecordCountPipe,
    TeamNamePipe,
    UserDisplayPipe,
    DateDisplayPipe
  ],

  declarations: [
    RecordCountPipe,
    TeamNamePipe,
    UserDisplayPipe,
    DateDisplayPipe
  ],

  providers: [],
})
export class PipesBarrelModule { }
