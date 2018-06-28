// @flow
import {registerPlugin} from 'playkit-js';
import {Kava} from './kava';

declare var __VERSION__: string;
declare var __NAME__: string;

export {Kava as Plugin};
export {__VERSION__ as VERSION, __NAME__ as NAME};

const pluginName: string = 'kava';

registerPlugin(pluginName, Kava);
