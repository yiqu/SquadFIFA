import { Component, OnInit, Input, Output, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ISeason } from 'src/app/shared/model/season.model';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavItem } from '../../shared/model/general-model';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/shared/services/core.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-core-feed',
  templateUrl: 'feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit, OnDestroy {
  
  seasonCategoryLinks: NavItem[] = [];
  onCompDestroy$: Subject<any> = new Subject();
  allSeasons: ISeason[] = [];
  currentFagment: string = "all";
  title: string = "";

  constructor(public cs: CoreService, public router: Router, public route: ActivatedRoute) {
    this.seasonCategoryLinks.push(new NavItem("All", null, false, false, "", "all"));
    this.seasonCategoryLinks.push(new NavItem("Ongoing", null, false, false, "", "ongoing"));
    this.seasonCategoryLinks.push(new NavItem("Completed", null, false, false, "", "completed"));
    this.route.fragment.subscribe((frag: string) => {
      this.currentFagment = frag ? frag : "all";
      this.title = this.currentFagment + " " + "Seasons";
    });
    
  }



  ngOnInit() {
    this.subscribeToSeasonListener();
  }


  subscribeToSeasonListener() {
    this.cs.allSeasons$.pipe(
      takeUntil(this.onCompDestroy$)
    ).subscribe((seasons: ISeason[]) => {
      this.allSeasons = seasons;
      console.log("ALL: ",this.allSeasons)
    },
    (err) => {
    },
    () => {
      console.log("szn all done from feed.")
    });
  }

  trackByFn(index: number, item: ISeason) {
    if (!item) {
      return null;
    }
    return item.hashKey;
  }

  ngOnDestroy() {
    this.onCompDestroy$.next();
    this.onCompDestroy$.complete();
  }
}