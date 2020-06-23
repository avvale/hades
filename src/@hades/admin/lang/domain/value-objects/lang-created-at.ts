import { TimeStamp } from '@hades/shared/domain/value-objects/time-stamp';

export class LangCreatedAt extends TimeStamp 
{
    public readonly type: 'LangCreatedAt';

    constructor(value: string) 
    {
        super(value, { 
            name: 'LangCreatedAt'
        });
    }
}