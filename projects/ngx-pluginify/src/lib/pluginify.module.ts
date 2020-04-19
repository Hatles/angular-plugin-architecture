import { APP_INITIALIZER, ModuleWithProviders, NgModule, Provider, Type } from '@angular/core';
import { PluginLoaderService } from './services/plugin-loader/plugin-loader.service';
import { ClientPluginLoaderService } from './services/plugin-loader/client-plugin-loader.service';
import {
  HttpPluginsConfigProvider, PLUGINS_CONFIG, PLUGINS_PATH,
  PluginsConfigProvider,
  StaticPluginsConfigProvider
} from './services/plugins-config.provider';
import { PluginsConfig, PluginsConfigStore } from './services/plugins-config.store';
import { PLUGIN_EXTERNALS_CONFIG } from './services/plugin-loader/plugin-externals';
import { TransferStateService } from './services/transfer-state.service';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { PluginifyLoaderService } from './services/plugin-loader/pluginify-loader-service';

export interface PluginifyConfig {
  path?: string;
  plugins?: PluginsConfig;
  externals?: {[key: string]: string};
}


export function pluginInitializerFactory(provider: PluginsConfigProvider, store: PluginsConfigStore) {
  const initializer = () =>
    provider
      .loadConfig()
      .toPromise()
      .then(conf => (store.config = conf));
  return initializer;
}

@NgModule({
  imports: [
    BrowserTransferStateModule
  ],
  declarations: [],
  exports: [],
  providers: [
    // keep empty
  ]
})
export class PluginifyModule {
  constructor(transferStateService: TransferStateService) {
  }

  static forRoot(config: PluginifyConfig): ModuleWithProviders {
    return {
      ngModule: PluginifyModule,
      providers: [
        { provide: PluginLoaderService, useClass: ClientPluginLoaderService },
        {
          provide: PLUGIN_EXTERNALS_CONFIG,
          useValue: config.externals || {}
        },
        ...buildConfigProviders(config),
        PluginsConfigStore,
        PluginifyLoaderService,
        {
          provide: APP_INITIALIZER,
          useFactory: pluginInitializerFactory,
          multi: true,
          deps: [PluginsConfigProvider, PluginsConfigStore]
        }
      ]
    };
  }

  static forPlugin(): ModuleWithProviders {
    return {
      ngModule: PluginifyModule,
      providers: [
      ]
    };
  }
}

export function buildConfigProviders(config: PluginifyConfig): Provider[] {
  return config.plugins ?
     [
      {
        provide: PluginsConfigProvider,
        useClass: StaticPluginsConfigProvider
      },
      {
        provide: PLUGINS_CONFIG,
        useValue: config.plugins
      }
    ] : [
      {
        provide: PluginsConfigProvider,
        useClass: HttpPluginsConfigProvider
      },
      {
        provide: PLUGINS_PATH,
        useValue: config.path
      }
    ];
}
