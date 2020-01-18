import { NgModule } from '@angular/core';
import { DropdownDirective } from './bs-drop.dir';
import { DateDisplayToggleDirective } from './date-display.dir';
import { PipesBarrelModule } from '../pipes/pipes.module';
import { DateDisplayPipe } from '../pipes/date-display.pipe';
import { InputTitleCaseDirective, InputGoalTimeDirective } from './input-title-case.dir';
import { TitleCasePipe } from '@angular/common';

@NgModule({
    imports: [
      PipesBarrelModule
    ],
    exports: [
      DropdownDirective,
      DateDisplayToggleDirective,
      InputTitleCaseDirective,
      InputGoalTimeDirective
    ],

    declarations: [
      DropdownDirective,
      DateDisplayToggleDirective,
      InputTitleCaseDirective,
      InputGoalTimeDirective
    ],

    providers: [
      //DateDisplayPipe
      TitleCasePipe
    ],
})
export class DirectivesModule { }
