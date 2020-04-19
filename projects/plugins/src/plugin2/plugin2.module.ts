import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Plugin2Component } from './plugin2.component';
import { SharedModule } from 'shared';
import { providePluginInitializerFn } from 'ngx-pluginify';

export function init(config): Type<any> {
  return Plugin2Component;
}

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [Plugin2Component],
  providers: [
    providePluginInitializerFn<any, Type<any>>(init)
  ],
  entryComponents: [Plugin2Component]
})
export class Plugin2Module {
}
