import { TimeStamp } from '@hades/shared/domain/value-objects/time-stamp';

export class TenantDeletedAt extends TimeStamp 
{
    public readonly type: 'TenantDeletedAt';

    constructor(value: string) 
    {
        super(value, { 
            name: 'TenantDeletedAt'
        });
    }
}