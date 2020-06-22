import { Uuid } from '@hades/shared/domain/value-objects/uuid';

export class TenantId extends Uuid 
{
    public readonly type: 'TenantId';

    constructor(value: string) 
    {
        super(value, { 
            name: 'TenantId'
        });
    }
}