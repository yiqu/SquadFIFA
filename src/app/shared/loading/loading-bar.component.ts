import {Component} from '@angular/core';

/**
 * @title Configurable progress-bar
 */
@Component({
  selector: 'app-loading-bar',
  templateUrl: 'loading-bar.component.html',
  styleUrls: ['./loading.css'],
})
export class LoadingBarComponent {
  color = 'primary';
  mode = 'indeterminate';
}