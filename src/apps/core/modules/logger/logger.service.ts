import { Logger } from '@nestjs/common';

export class LoggerService extends Logger
{
    log(message: string) 
    {
        /* your implementation */
        super.log(message);
    }

    error(message: string, trace: string) 
    {
        /* your implementation */
        super.error(message, trace);
    }
    
    warn(message: string) 
    {
        /* your implementation */
        super.warn(message);
    }
    
    debug(message: string) 
    {
        /* your implementation */
        super.debug(message);
    }
    
    verbose(message: string) 
    {
        /* your implementation */
        super.verbose(message);
    }
}