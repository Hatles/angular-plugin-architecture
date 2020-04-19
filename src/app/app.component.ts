import { Component, Injector, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { PluginifyLoaderService } from 'ngx-pluginify';
import { SharedModule, SharedService } from 'shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('targetRef', { read: ViewContainerRef }) vcRef: ViewContainerRef;

  clicks: string[] = [];

  constructor(
    private injector: Injector,
    private pluginLoader: PluginifyLoaderService,
    private sharedService: SharedService
  ) {
    sharedService.onClick.subscribe(click => this.clicks.push(click));
  }

  ngOnInit() {
    this.loadPlugin('plugin1', SharedModule.PLUGIN_TYPE_COMPONENT);
  }

  loadPlugin(pluginName: string, pluginType?: string, config?: any) {
    this.pluginLoader.load<any, Type<any>>(pluginName, pluginType, config).then((result) => {
      const compFactory = result.moduleRef.componentFactoryResolver.resolveComponentFactory(
        result.result
      );
      this.vcRef.createComponent(compFactory);
    });
  }
}
