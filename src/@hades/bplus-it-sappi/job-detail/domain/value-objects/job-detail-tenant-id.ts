import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobDetailTenantId extends UuidValueObject
{
    public readonly type: 'JobDetailTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobDetailTenantId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}