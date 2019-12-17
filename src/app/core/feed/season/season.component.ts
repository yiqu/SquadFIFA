import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { ISeason } from 'src/app/shared/model/season.model';
import { SeasonDirective } from './directives/season.dir';
import { SeasonItem } from './types/base-item';
import { SeasonDynamicBase } from './types/base.component';
import { SingleSeasonComponent } from './types/single.component';
import { PvpSeasonComponent } from './types/pvp.component';
import { User } from 'src/app/shared/model/user.model';

const comp: string = "comp";

@Component({
  selector: 'feed-season',
  templateUrl: 'season.component.html',
  styleUrls: ['season.component.css']
})

export class FeedSeasonComponent implements OnInit {

  @Input('seasonInfo')
  season: ISeason;

  @ViewChild(SeasonDirective, {static: true}) 
  seasonHost: SeasonDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    
  }

  ngOnInit() {
    this.loadSeasonComponent();
  }

  loadSeasonComponent() {
    let seasonItem: SeasonItem;

    if (this.checkIfPvE(this.season.player1) || this.checkIfPvE(this.season.player2)) {
      seasonItem = new SeasonItem(SingleSeasonComponent, this.season);
    } else {
      seasonItem = new SeasonItem(PvpSeasonComponent, this.season);
    }
    
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(seasonItem.component);

    const viewContainerRef = this.seasonHost.viewContainerRef;

    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<SeasonDynamicBase>componentRef.instance).seasonInfo = seasonItem.data;
  }

  checkIfPvE(user: User): boolean {
    if (user.user.firstName.toLowerCase().includes(comp) ||
      user.user.lastName.toLowerCase().includes(comp) ||
      user.user.id.toLowerCase().includes(comp)) {
        return true;
    }
    return false;
  }

}