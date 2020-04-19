import { PluginInitializerService } from 'ngx-pluginify';
import { Plugin1Component } from './plugin1.component';
import { SharedService } from 'shared';
import { Type } from '@angular/core';

export class Plugin1Initializer extends PluginInitializerService<any, Type<any>> {

  constructor(private shared: SharedService) {
    super();
  }

  initialize(config?: any): Type<any> {
    this.shared.click('test inject');
    return Plugin1Component;
  }
}
