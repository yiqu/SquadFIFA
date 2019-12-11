import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISeason } from 'src/app/shared/model/season.model';

export interface SeasonDynamicBase  {

  seasonInfo: ISeason;
  createdDateDisplay: string;
  
}