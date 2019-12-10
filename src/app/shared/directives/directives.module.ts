import { NgModule } from '@angular/core';
import { DropdownDirective } from './bs-drop.dir';
import { DateDisplayToggleDirective } from './date-display.dir';
import { PipesBarrelModule } from '../pipes/pipes.module';
import { DateDisplayPipe } from '../pipes/date-display.pipe';

@NgModule({
    imports: [
      PipesBarrelModule
    ],
    exports: [
      DropdownDirective,
      DateDisplayToggleDirective
    ],

    declarations: [
      DropdownDirective,
      DateDisplayToggleDirective
    ],

    providers: [
      //DateDisplayPipe
    ],
})
export class DirectivesModule { }
