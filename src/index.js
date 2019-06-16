// @flow
import {registerPlugin} from '@playkit-js/playkit-js';
import {Kava} from './kava';

declare var __VERSION__: string;
declare var __NAME__: string;

const VERSION = __VERSION__;
const NAME = __NAME__;

export {Kava as Plugin, VERSION, NAME};
export {KavaEventType as EventType} from './kava-event-model';

const pluginName: string = 'kava';

registerPlugin(pluginName, Kava);
