import * as moment from 'moment-timezone';
import * as crypto from 'crypto';
declare const Buffer;

export class Utils
{
    public static nowTimestamp(): string
    {   
        return moment().tz(process.env.TZ).format('YYYY-MM-DD H:mm:ss');
    }

    public static sha1(data: string): string
    {
        const generator = crypto.createHash('sha1');
        generator.update(data);  
        
        return generator.digest('hex');
    }
   
    public static base64Encode(data: string): string
    {
        return Buffer.from(data).toString('base64');
    }

    public static base64Decode(data: string): string
    {
        return Buffer.from(data, 'base64').toString('utf-8')
    }
}