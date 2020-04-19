import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from 'shared';
import { PluginifyModule, PluginExternals, PLUGIN_EXTERNALS_CONFIG, providePluginExternals } from 'ngx-pluginify';
import * as shared from 'shared';
import { SharedService } from 'shared';
import { SharedAppService } from './shared-app.service';

export const externals: PluginExternals = {
  'shared': shared
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    SharedModule.forRoot(),
    PluginifyModule.forRoot({
      path: '/assets/plugins-config.json',
    })
  ],
  providers: [
    {
      provide: SharedService,
      useClass: SharedAppService
    },
    {
      provide: PLUGIN_EXTERNALS_CONFIG,
      useValue: externals,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
