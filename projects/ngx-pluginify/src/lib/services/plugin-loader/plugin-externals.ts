import * as core from '@angular/core';
import * as common from '@angular/common';
import * as commonHttp from '@angular/common/http';
import * as platformBrowser from '@angular/platform-browser';
import * as forms from '@angular/forms';
import * as router from '@angular/router';
import * as rxjs from 'rxjs';
import * as tslib from 'tslib';
import { InjectionToken } from '@angular/core';
import * as ngxPluginify from '../../externals';

export interface PluginExternals {
  [key: string]: any;
}

export const PLUGIN_EXTERNALS_CONFIG = new InjectionToken<PluginExternals>('PLUGIN_EXTERNALS_CONFIG');

/**
 * @deprecated Use constant provider
 * {
 *   provide: PLUGIN_EXTERNALS_CONFIG,
 *   useValue: externals,
 *   multi: true
 * }
 */
export function providePluginExternals(externals: PluginExternals) {
  return {
    provide: PLUGIN_EXTERNALS_CONFIG,
    useValue: externals,
    multi: true
  };
}

export const PLUGIN_EXTERNALS_MAP: PluginExternals = {
  'ng.core': core,
  'ng.common': common,
  'ng.common.http': commonHttp,
  'ng.forms': forms,
  'ng.router': router,
  'ng.platform-browser': platformBrowser,
  rxjs,
  tslib,
  'ngx-pluginify': ngxPluginify,
};
