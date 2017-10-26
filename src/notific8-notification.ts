export interface Notific8Options {
  closeText?: string;
  color?: string;
  horizontalEdge?: string;
  life?: number;
  namespace?: string;
  onCreate?: Function[];
  onClose?: Function[];
  onInit?: Function[];
  queue?: boolean;
  sticky?: boolean;
  theme?: string;
  verticalEdge?: string;
  zindex?: number;
}

export class Notific8Notification {
  constructor(
    public message: string, 
    public options: Notific8Options
  ) {
    this.options.closeText = this.options.closeText || 'close',
    this.options.color = this.options.color || 'teal',
    this.options.horizontalEdge = this.options.horizontalEdge || 'top',
    this.options.life = this.options.life || 10000,
    this.options.namespace = this.options.namespace || 'notific8',
    this.options.onCreate = this.options.onCreate || [],
    this.options.onClose = this.options.onClose || [],
    this.options.onInit = this.options.onInit || [],
    this.options.queue = this.options.queue || false,
    this.options.sticky = this.options.sticky || false,
    this.options.theme = this.options.theme || 'ocho',
    this.options.verticalEdge = this.options.verticalEdge || 'right',
    this.options.zindex = this.options.zindex || 1100
  }
}