import FileStreamRotator from 'file-stream-rotator';
import morgan from 'morgan';
import {path as root} from 'app-root-path';

export default morgan('combined', {stream: FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: `${root}/log/access-%DATE%.log`,
    frequency: 'daily',
    verbose: false
}), skip: (req, res) => res.statusCode < 400});