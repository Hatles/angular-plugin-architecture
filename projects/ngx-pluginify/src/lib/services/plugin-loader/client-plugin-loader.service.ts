// tslint:disable-next-line:no-reference
/// <reference path="../../../typings.d.ts" />
import { Inject, Injectable, NgModuleFactory } from '@angular/core';
import { PluginLoaderService } from './plugin-loader.service';
import { PLUGIN_EXTERNALS_CONFIG, PLUGIN_EXTERNALS_MAP, PluginExternals } from './plugin-externals';
import { PluginsConfigStore } from '../plugins-config.store';

const SystemJs = window.System;

@Injectable()
export class ClientPluginLoaderService extends PluginLoaderService {

  constructor(private configStore: PluginsConfigStore,
              @Inject(PLUGIN_EXTERNALS_CONFIG) externals: PluginExternals) {
    super({...PLUGIN_EXTERNALS_MAP, ...externals});
  }


  provideExternals(externals: PluginExternals) {
    Object.keys(externals).forEach(externalKey =>
      window.define(externalKey, [], () => externals[externalKey])
    );
  }

  load<T>(pluginName): Promise<NgModuleFactory<T>> {
    const { config } = this.configStore;
    if (!config[pluginName]) {
      throw Error(`Can't find appropriate plugin`);
    }

    const depsPromises = (config[pluginName].deps || []).map(dep => {
      return SystemJs.import(config[dep].path).then(m => {
        window['define'](dep, [], () => m.default);
      });
    });

    return Promise.all(depsPromises).then(() => {
      return SystemJs.import(config[pluginName].path).then(
        module => module.default.default
      );
    });
  }
}
