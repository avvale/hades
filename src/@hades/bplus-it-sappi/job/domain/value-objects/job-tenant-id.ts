import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobTenantId extends UuidValueObject
{
    public readonly type: 'JobTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobTenantId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}