import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TenantCreatedAt extends TimestampValueObject 
{
    public readonly type: 'TenantCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TenantCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}