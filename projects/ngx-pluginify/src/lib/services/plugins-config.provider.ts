import { Inject, Injectable, InjectionToken, Optional, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { preserveServerState } from './transfer-state.service';
import { Observable, of } from 'rxjs';
import { PluginsConfig } from './plugins-config.store';

export abstract class PluginsConfigProvider {
  abstract loadConfig(): Observable<PluginsConfig> ;
}

export const PLUGINS_PATH = new InjectionToken<string>('PLUGINS_PATH');
export const PLUGINS_CONFIG = new InjectionToken<PluginsConfig>('PLUGINS_CONFIG');

@Injectable()
export class HttpPluginsConfigProvider implements PluginsConfigProvider {

  constructor(
    private http: HttpClient,
    @Inject(PLUGINS_PATH) private readonly pluginsPath: string
  ) {
  }

  @preserveServerState('PLUGIN_CONFIGS')
  loadConfig(): Observable<PluginsConfig> {
    return this.http.get<PluginsConfig>(this.pluginsPath);
  }
}

@Injectable()
export class StaticPluginsConfigProvider implements PluginsConfigProvider {

  constructor(
    private http: HttpClient,
    @Inject(PLUGINS_CONFIG) private readonly config: PluginsConfig
  ) {
  }

  @preserveServerState('PLUGIN_CONFIGS')
  loadConfig(): Observable<PluginsConfig> {
    return of(this.config);
  }
}
