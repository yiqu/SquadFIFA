import { NgModule } from '@angular/core';
import { RecordCountPipe } from './record.pipe';
import { TeamNamePipe } from './team-name.pipe';
import { UserDisplayPipe } from './user-name.pipe';

@NgModule({
  imports: [],
  exports: [
    RecordCountPipe,
    TeamNamePipe,
    UserDisplayPipe
  ],

  declarations: [
    RecordCountPipe,
    TeamNamePipe,
    UserDisplayPipe
  ],

  providers: [],
})
export class PipesBarrelModule { }
