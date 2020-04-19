import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from 'shared';
import { PluginifyModule, PluginExternals } from 'ngx-pluginify';
import * as shared from 'shared';
import { SharedService } from 'shared';
import { SharedAppService } from './shared-app.service';

const externals: PluginExternals = {
  shared
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
      externals: externals
    })
  ],
  providers: [
    {
      provide: SharedService,
      useClass: SharedAppService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
