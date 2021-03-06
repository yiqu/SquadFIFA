import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginDialogComponent } from './login/login.component';
import { MaterialModules } from '../material-module';
import { NewSeasonComponent } from './new-season/new-season.component';
import { PipesBarrelModule } from '../../shared/pipes/pipes.module';
import { LoadingBarModule } from '../../shared/loading/loading.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules,
    PipesBarrelModule,
    LoadingBarModule
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
