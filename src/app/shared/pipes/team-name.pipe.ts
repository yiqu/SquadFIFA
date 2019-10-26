import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

@Pipe({name: 'teamNamePipe', pure: true})
export class TeamNamePipe implements PipeTransform {
  
  @memo()
  transform(value: any): any {
    let res = new TeamDisplay("None", "none.jpg");
    if (value) {
      res.name = value;
      res.url = res.url;
    }
    return res;
  }
}

export class TeamDisplay {
  constructor(public name: string, public url: string) {

  }
}