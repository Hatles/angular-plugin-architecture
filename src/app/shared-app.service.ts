import { Injectable } from '@angular/core';
import { SharedService } from 'shared';

@Injectable()
export class SharedAppService extends SharedService {
  public click(test: string) {
    super.click('app: ' + test);
  }
}
