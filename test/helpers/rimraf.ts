import * as rimraf from 'rimraf';
import * as util from 'util';

export const rmrf = util.promisify(rimraf);
