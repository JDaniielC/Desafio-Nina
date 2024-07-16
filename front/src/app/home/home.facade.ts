import { Injectable } from '@angular/core';
import { HomeState } from './state/home.state';

@Injectable()
export class HomeFacade {
  constructor(
    readonly state: HomeState
  ) {}
}
