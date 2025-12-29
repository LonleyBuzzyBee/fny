import { Buffer } from 'buffer';
import process from 'process';

window.Buffer = window.Buffer || Buffer;
window.process = window.process || process;

global.Buffer = global.Buffer || Buffer;
global.process = global.process || process;