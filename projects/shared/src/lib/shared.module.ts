import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponent } from './shared.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tabs/tab.component';
import { ButtonComponent } from './button/button.component';
import { SharedService } from './services/shared.service';

const sharedComponents = [SharedComponent, ButtonComponent, TabComponent, TabsComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [...sharedComponents],
  exports: [...sharedComponents],
  providers: [
    // keep empty
  ]
})
export class SharedModule {
  static PLUGIN_TYPE_COMPONENT = 'plugin_component';

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        SharedService
      ]
    };
  }
}
