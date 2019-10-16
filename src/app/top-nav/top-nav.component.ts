import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-top',
  templateUrl: 'top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})

export class TopNavComponent implements OnInit {

  title: string = "Squad FIFA";
  
  constructor() {
    
  }

  ngOnInit() { }
}