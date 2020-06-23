import { TimeStamp } from '@hades/shared/domain/value-objects/time-stamp';

export class LangUpdatedAt extends TimeStamp 
{
    public readonly type: 'LangUpdatedAt';

    constructor(value: string) 
    {
        super(value, { 
            name: 'LangUpdatedAt'
        });
    }
}