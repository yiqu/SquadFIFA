import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { MaterialModules } from './shared/material-module';
import { FormsModule } from "@angular/forms";
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { LogoutComponent } from './top-nav/logout/logout.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundModule } from './404/not-found.module';
import { DirectivesModule } from './shared/directives/directives.module';
import { PlayersModule } from './players/players.module';
import { StatsModule } from './stats/stats.module';
import { TeamsModule } from './teams/teams.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginDialogComponent } from './shared/dialogs/login/login.component';
import { DialogsModule } from './shared/dialogs/dialogs.module';
import { LogoutResolver } from './shared/resolvers/logout.resolver';
import { SelfModule } from './self/self.module';
import { SelfGuard } from './shared/route-guards/self.guard';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    LogoutComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MaterialModules,
    CoreModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      extendedTimeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
      closeButton: true,
      enableHtml: true,
      progressBar: true,
      newestOnTop: true,
      iconClasses : {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      }
    }),
    NotFoundModule,
    DirectivesModule,
    PlayersModule,
    StatsModule,
    TeamsModule,
    DialogsModule,
    SelfModule,
    AppRoutingModule
  ],

  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: null },
    LogoutResolver,
    SelfGuard
  ],

  entryComponents: [
    LoginDialogComponent
  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
