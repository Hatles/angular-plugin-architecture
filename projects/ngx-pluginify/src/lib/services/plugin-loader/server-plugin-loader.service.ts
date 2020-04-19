import { Injectable, NgModuleFactory } from '@angular/core';
import { PluginLoaderService } from './plugin-loader.service';
import { PLUGIN_EXTERNALS_MAP, PluginExternals } from './plugin-externals';
import { PluginsConfigStore } from '../plugins-config.store';

declare let global: any;

@Injectable()
export class ServerPluginLoaderService extends PluginLoaderService {
  constructor(private configStore: PluginsConfigStore) {
    super(PLUGIN_EXTERNALS_MAP);
  }

  provideExternals(externals: PluginExternals) {
    const that = this;
    const Module = global['require']('module');
    const originalRequire = Module.prototype.require;
    Module.prototype.require = function(name) {
      if (that.configStore.config[name]) {
        return global['require'](
          `./browser${that.configStore.config[name].path}`
        );
      }
      return (
        externals[name] || originalRequire.apply(this, arguments)
      );
    };
  }

  load<T>(pluginName): Promise<NgModuleFactory<T>> {
    const { config } = this.configStore;
    if (!config[pluginName]) {
      throw Error(`Can't find appropriate plugin`);
    }

    const factory = global['require'](`./browser${config[pluginName].path}`)
      .default;
    return Promise.resolve(factory);
  }
}
