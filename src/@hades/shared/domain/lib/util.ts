import * as moment from 'moment';

export class Util
{
    public static nowTimeStamp(): string
    {
        return moment().format('YYYY-MM-DD h:mm:ss');
    }
}