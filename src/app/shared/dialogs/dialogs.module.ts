import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginDialogComponent } from './login/login.component';
import { MaterialModules } from '../material-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModules
  ],

  exports: [
    LoginDialogComponent
  ],

  declarations: [
    LoginDialogComponent
  ],

  providers: [

  ],
})
export class DialogsModule { }
