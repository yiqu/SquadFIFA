import { Component, OnInit, Input, Output, ChangeDetectorRef } from '@angular/core';
import { ISeason } from 'src/app/shared/model/season.model';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavItem } from '../../shared/model/general-model';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/shared/services/core.service';

@Component({
  selector: 'app-core-feed',
  templateUrl: 'feed.component.html',
  styleUrls: ['./feed.component.css']
})

export class FeedComponent implements OnInit {
  
  seasonCategoryLinks: NavItem[] = [];

  @Input()
  allSeasons: ISeason[] = [];

  constructor(public cs: CoreService, public router: Router, public route: ActivatedRoute) {
    this.seasonCategoryLinks.push(new NavItem("All", null, false, false, "", "all"));
    this.seasonCategoryLinks.push(new NavItem("Ongoing", null, false, false, "", "ongoing"));
    this.seasonCategoryLinks.push(new NavItem("Completed", null, false, false, "", "completed"));
    this.route.fragment.subscribe((frag: string) => {
      //console.log(frag)
    });
    
  }



  ngOnInit() {
    
  }
}