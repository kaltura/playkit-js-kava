import { registerPlugin } from '@playkit-js/kaltura-player-js';
import { Kava } from './kava';

declare const __VERSION__: string;
declare const __NAME__: string;

const VERSION = __VERSION__;
const NAME = __NAME__;

export { Kava as Plugin };
export { KavaEventType as EventType } from './kava-event-model';
export { HttpMethodType } from './http-method-type';
export { VERSION, NAME };

const pluginName: string = 'kava';

registerPlugin(pluginName, Kava);
