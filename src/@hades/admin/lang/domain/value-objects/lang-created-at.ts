import { Timestamp } from '@hades/shared/domain/value-objects/timestamp';

export class LangCreatedAt extends Timestamp 
{
    public readonly type: 'LangCreatedAt';

    constructor(value: string) 
    {
        super(value, { 
            name: 'LangCreatedAt'
        });
    }
}