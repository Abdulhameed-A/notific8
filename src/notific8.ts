import { Notific8Options, Notific8Notification } from './notific8-notification';
import { Notific8Module } from './notific8-module';

export class Notific8 {
  private static modules: Notific8Module[] = [];
  private static defaultOptions: Notific8Options = {
    closeText: 'close',
    color: 'teal',
    horizontalEdge: 'top',
    life: 10000,
    namespace: 'notific8',
    onCreate: [],
    onClose: [],
    onInit: [],
    queue: false,
    sticky: false,
    theme: 'ocho',
    verticalEdge: 'right',
    zindex: 1100
  }

  public static registerModule(
    moduleName: string, 
    position: string, 
    defaultOptions: {}, 
    callbackMethod: Function
  ) {
    const module = new Notific8Module(moduleName, position, defaultOptions, callbackMethod);

    this.modules.push(module);
  }

  public static notification(message: string, options: Notific8Options): Notific8Notification {
    options = this.ensureValuesAreSet(options);
    const notification = new Notific8Notification(message, options);
    
    return notification;
  }

  public static zindex(zindex?: number|string): number {
    if (zindex !== undefined && zindex !== null) {
      this.defaultOptions.zindex = Number(zindex);
    }

    return this.defaultOptions.zindex as number;
  }

  private static ensureValuesAreSet(options: Notific8Options): Notific8Options {
    options.closeText      = options.closeText      || this.defaultOptions.closeText;
    options.color          = options.color          || this.defaultOptions.color;
    options.horizontalEdge = options.horizontalEdge || this.defaultOptions.horizontalEdge;
    options.life           = options.life           || this.defaultOptions.life;
    options.namespace      = options.namespace      || this.defaultOptions.namespace;
    options.onCreate       = options.onCreate       || this.defaultOptions.onCreate;
    options.onClose        = options.onClose        || this.defaultOptions.onClose;
    options.onInit         = options.onInit         || this.defaultOptions.onInit;
    options.queue          = options.queue          || this.defaultOptions.queue;
    options.sticky         = options.sticky         || this.defaultOptions.sticky;
    options.theme          = options.theme          || this.defaultOptions.theme;
    options.verticalEdge   = options.verticalEdge   || this.defaultOptions.verticalEdge;
    options.zindex         = options.zindex         || this.defaultOptions.zindex;

    return options;
  }
}