import { TimeStamp } from '@hades/shared/domain/value-objects/time-stamp';

export class TenantUpdatedAt extends TimeStamp 
{
    public readonly type: 'TenantUpdatedAt';

    constructor(value: string) 
    {
        super(value, { 
            name: 'TenantUpdatedAt'
        });
    }
}