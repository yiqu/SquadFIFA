import { NgModule } from '@angular/core';
import { RecordCountPipe } from './record.pipe';
import { TeamNamePipe } from './team-name.pipe';

@NgModule({
  imports: [],
  exports: [
    RecordCountPipe,
    TeamNamePipe
  ],

  declarations: [
    RecordCountPipe,
    TeamNamePipe
  ],

  providers: [],
})
export class PipesBarrelModule { }
