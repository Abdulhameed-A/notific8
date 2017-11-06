import { 
  Notific8Options,
  Notific8Notification,
  Notific8OptionTypes 
} from './notific8-notification';
import { Notific8Module } from './notific8-module';

export class Notific8 {
  private static modules: Notific8Module[] = [];
  private static defaultOptions: Notific8Options = {
    closeText: 'close',
    color: 'teal',
    horizontalEdge: 'top',
    life: 10000,
    namespace: 'notific8',
    onCreate: {},
    onClose: {},
    onInit: {},
    queue: false,
    sticky: false,
    theme: 'ocho',
    verticalEdge: 'right',
    zindex: 1100,
    modules: []
  };

  public static registerModule(
    moduleName: string, 
    position: string, 
    defaultOptions: {}, 
    callbackMethod: Function
  ) {
    const module = new Notific8Module(moduleName, position, defaultOptions, callbackMethod);

    this.modules.push(module);
  }

  public static notification(
    message: string,
    options: { [ key: string ]: Notific8OptionTypes|undefined }
  ): Notific8Notification {
    const sanitizedOptions: Notific8Options = this.ensureValuesAreSet(options);
    const notification = new Notific8Notification(message, sanitizedOptions);
    
    return notification;
  }

  public static setDefault(property: string, value: Notific8OptionTypes): Notific8Options {
    switch (property) {
      case 'closeText':
        this.defaultOptions.closeText = value as string;
      break;
      case 'color':
        this.defaultOptions.color = value as string;
      break;
      case 'horizontalEdge':
        this.defaultOptions.horizontalEdge = value as string;
      break;
      case 'life':
        this.defaultOptions.life = value as number;
      break;
      case 'namespace':
        this.defaultOptions.namespace = value as string;
      break;
      case 'queue':
        this.defaultOptions.queue = value as boolean;
      break;
      case 'sticky':
        this.defaultOptions.sticky = value as boolean;
      break;
      case 'theme':
        this.defaultOptions.theme = value as string;
      break;
      case 'verticalEdge':
        this.defaultOptions.verticalEdge = value as string;
      break;
      case 'zindex':
        this.defaultOptions.zindex = value as number;
      break;
    }

    return this.defaultOptions;
  }

  public static getDefaults(): Notific8Options {
    return this.defaultOptions;
  }

  public static addDefaultHandler(handlerType: 'onCreate'|'onClose'|'onInit', handler: Function, id?: string): { [ key: string ]: Function } {
    if (!id) {
      id = `handler${Object.keys(this.defaultOptions[handlerType] as Object).length + 1}`;
    }

    (this.defaultOptions[handlerType] as { [ key: string ]: Function })[id] = handler;

    return (this.defaultOptions[handlerType] as { [ key: string ]: Function });
  }

  public static removeDefaultHandler(handlerType: 'onCreate'|'onClose'|'onInit', id: string): { [ key: string ]: Function } {
    delete (this.defaultOptions[handlerType] as { [ key: string ]: Function })[id];

    return (this.defaultOptions[handlerType] as { [ key: string ]: Function });
  }

  private static ensureValuesAreSet(options: { [ key: string ]: Notific8OptionTypes|undefined|{ [key: string]: Notific8OptionTypes|undefined }[] }): Notific8Options {
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
    options.modules        = options.modules        || this.defaultOptions.modules;

    return options as Notific8Options;
  }
}