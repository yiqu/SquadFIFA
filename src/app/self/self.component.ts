import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/user.service';
import { User } from '../shared/model/user.model';

@Component({
  selector: 'app-self',
  templateUrl: 'self.component.html',
  styleUrls: ['./self.component.css']
})

export class SelfComponent implements OnInit {
  constructor(public ls: LoginService) {
    
  }

  ngOnInit() {
    console.log("in SELF")
    this.ls.currentUser$.subscribe((user: User) => {
      console.log(user)
    });
  }
}