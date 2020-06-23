import { TimeStamp } from '@hades/shared/domain/value-objects/time-stamp';

export class LangDeletedAt extends TimeStamp 
{
    public readonly type: 'LangDeletedAt';

    constructor(value: string) 
    {
        super(value, { 
            name: 'LangDeletedAt'
        });
    }
}