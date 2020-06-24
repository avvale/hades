import { Timestamp } from '@hades/shared/domain/value-objects/timestamp';

export class LangUpdatedAt extends Timestamp 
{
    public readonly type: 'LangUpdatedAt';

    constructor(value: string) 
    {
        super(value, { 
            name: 'LangUpdatedAt'
        });
    }
}