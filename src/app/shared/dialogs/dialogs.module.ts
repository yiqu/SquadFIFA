import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginDialogComponent } from './login/login.component';
import { MaterialModules } from '../material-module';
import { NewSeasonComponent } from './new-season/new-season.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModules
  ],

  exports: [
    LoginDialogComponent,
    NewSeasonComponent
  ],

  declarations: [
    LoginDialogComponent,
    NewSeasonComponent
  ],

  providers: [

  ],
})
export class DialogsModule { }
