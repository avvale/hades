import * as moment from 'moment';

export class Utils
{
    public static nowTimeStamp(): string
    {
        return moment().format('YYYY-MM-DD h:mm:ss');
    }
}