import { UuidArrayValueObject } from '@hades/shared/domain/value-objects/uuid-array.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class TenantAccountIds extends UuidArrayValueObject 
{
    public readonly type: 'TenantAccountIds';

    constructor(value: string[], validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TenantAccountIds',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}