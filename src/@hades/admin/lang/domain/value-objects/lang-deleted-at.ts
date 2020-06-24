import { Timestamp } from '@hades/shared/domain/value-objects/timestamp';

export class LangDeletedAt extends Timestamp 
{
    public readonly type: 'LangDeletedAt';

    constructor(value: string) 
    {
        super(value, { 
            name: 'LangDeletedAt'
        });
    }
}