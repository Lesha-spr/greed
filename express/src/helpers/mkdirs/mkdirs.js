import fs from 'fs';
import config from './../../config/';
import {path as root} from 'app-root-path';

export default (() => {
    fs.existsSync(`${root}/log`) || fs.mkdirSync(`${root}/log`);
    fs.existsSync(config.imagePath) || fs.mkdirSync(config.imagePath);

    console.log('Project dirs are created!');

    return true;
})();