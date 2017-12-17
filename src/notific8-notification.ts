export declare type Notific8OptionTypes = string|number|{ [ key: string ]: Function }|boolean;

export declare interface Notific8Options {
  closeText?: string;
  color?: string;
  horizontalEdge?: string;
  life?: number;
  namespace?: string;
  onCreate?: { [ key: string ]: Function };
  onClose?: { [ key: string ]: Function };
  // onContainerCreate?: { [ key: string ]: (container: Element, options: Notific8Options) => {} };
  onContainerCreate?: { [ key: string ]: Function };
  onInit?: { [ key: string ]: Function };
  queue?: boolean;
  sticky?: boolean;
  theme?: string;
  verticalEdge?: string;
  zindex?: number;
  modules?: Array<{ [key: string]: Notific8OptionTypes|undefined }>;
}

export class Notific8Notification {
  constructor(
    public message: string,
    public options: Notific8Options
  ) {}
}
