import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Plugin1Component } from './plugin1.component';
import { SharedModule } from 'shared';
import { Plugin1Initializer } from './plugin1.initializer';
import { providePluginInitializer } from 'ngx-pluginify';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [Plugin1Component],
  providers: [
    providePluginInitializer(Plugin1Initializer, SharedModule.PLUGIN_TYPE_COMPONENT, 'plugin1')
  ],
  entryComponents: [Plugin1Component]
})
export class Plugin1Module {
}
