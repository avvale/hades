import { TimeStamp } from '@hades/shared/domain/value-objects/time-stamp';

export class TenantCreatedAt extends TimeStamp 
{
    public readonly type: 'TenantCreatedAt';

    constructor(value: string) 
    {
        super(value, { 
            name: 'TenantCreatedAt'
        });
    }
}