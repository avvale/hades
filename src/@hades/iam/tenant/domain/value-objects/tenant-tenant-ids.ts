import { UuidArrayValueObject } from '@hades/shared/domain/value-objects/uuid-array.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class TenantTenantIds extends UuidArrayValueObject 
{
    public readonly type: 'TenantTenantIds';

    constructor(value: string[], validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TenantTenantIds',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}