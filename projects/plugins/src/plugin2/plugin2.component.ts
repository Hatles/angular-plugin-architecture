import { Component } from '@angular/core';
import { SharedService } from 'shared';

@Component({
  selector: 'app-plugin-2',
  templateUrl: './plugin2.component.html'
})
export class Plugin2Component {
  constructor(public sharedService: SharedService) {}

  onClick() {
    this.sharedService.click('plugin2 click');
  }
}
