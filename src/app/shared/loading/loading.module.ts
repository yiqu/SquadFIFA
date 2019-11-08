import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModules } from '../material-module';
import { LoadingBarComponent } from './loading-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModules,
  ],

  exports: [
    LoadingBarComponent
  ],

  declarations: [
    LoadingBarComponent
  ],

  providers: [
  ],
})
export class LoadingBarModule { }
