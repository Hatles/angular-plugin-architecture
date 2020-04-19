import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SharedService {
  private _onClick: Subject<string> = new Subject<string>();
  public onClick: Observable<string> = this._onClick.asObservable();

  public click(test: string) {
    this._onClick.next(test);
  }
}
