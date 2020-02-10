import { Component, OnInit, Input, Output, ChangeDetectorRef, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { ISeason } from 'src/app/shared/model/season.model';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavItem } from '../../shared/model/general-model';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/shared/services/core.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as _ from 'lodash';
import { FeedSeasonComponent } from './season/season.component';

@Component({
  selector: 'app-core-feed',
  templateUrl: 'feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit, OnDestroy {
  
  @ViewChildren(FeedSeasonComponent) 
  feedSeasonComps: QueryList<FeedSeasonComponent>;

  seasonCategoryLinks: NavItem[] = [];
  onCompDestroy$: Subject<any> = new Subject();
  seasonsDisplay: ISeason[] = [];
  currentFagment: string = "all";
  title: string = "All Seasons";

  constructor(public cs: CoreService, public router: Router, public route: ActivatedRoute) {
    this.seasonCategoryLinks.push(new NavItem("All", null, false, false, "", "all"));
    this.seasonCategoryLinks.push(new NavItem("Ongoing", null, false, false, "", "ongoing"));
    this.seasonCategoryLinks.push(new NavItem("Completed", null, false, false, "", "completed"));

    this.route.fragment.subscribe((frag: string) => {
      //this.currentFagment = frag ? frag : "all";
      //this.title = this.currentFagment + " " + "Seasons";
    });
    
  }

  ngOnInit() {
    this.subscribeToSeasonListener();
  }

  subscribeToSeasonListener() {
    this.cs.allSeasons$.pipe(
      takeUntil(this.onCompDestroy$)
    ).subscribe((seasons: ISeason[]) => {
      this.seasonsDisplay = seasons;
      this.seasonsDisplay = this.sortSeasons("DESC");
      //document.querySelector("#season-1").scrollIntoView({behavior: 'auto'});
    },
    (err) => {
    },
    () => {
      console.log("szn all done from feed.")
    });
  }

  /**
   * TODO: Not using the Trackby because updates will not be reflected onto the page.
   * due to tracking if the hashkey has been updated. Since updates will not change
   * the haskey, the page will not show the updates to score, games, etc..
   * @param index 
   * @param item 
   */
  trackByFn(index: number, item: ISeason) {
    if (!item) {
      return null;
    }
    return item.hashKey;
  }

  sortSeasons(sortType: string) {
    switch(sortType) {
      case "ASC": {
        return _.sortBy(this.seasonsDisplay, ['startDate']);
      }
      case "DESC": {
        return (_.sortBy(this.seasonsDisplay, ['startDate'])).reverse();
      }
      default: {
        return this.seasonsDisplay;
      }
    }
  }

  ngOnDestroy() {
    this.onCompDestroy$.next();
    this.onCompDestroy$.complete();
  }
}