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
  ) {}
}