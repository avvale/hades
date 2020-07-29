import * as moment from 'moment';
import * as crypto from 'crypto'; 

export class Utils
{
    public static nowTimestamp(): string
    {
        return moment().format('YYYY-MM-DD h:mm:ss');
    }

    public static sha1(data: string): string
    {
        const generator = crypto.createHash('sha1');
        generator.update(data);  
        
        return generator.digest('hex');
   }
}