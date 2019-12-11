import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { ISeason } from 'src/app/shared/model/season.model';
import { SeasonDirective } from './directives/season.dir';
import { SeasonItem } from './types/base-item';
import { SeasonDynamicBase } from './types/base.component';
import { SingleSeasonComponent } from './types/single.component';
import { PvpSeasonComponent } from './types/pvp.component';

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
    console.log(this.season)
    this.loadSeasonComponent();
  }

  loadSeasonComponent() {
    let seasonItem: SeasonItem;

    if (this.season.player1.user.firstName.toLowerCase().includes("computer") ||
      this.season.player2.user.firstName.toLowerCase().includes("computer")) {
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

}