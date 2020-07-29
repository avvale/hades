import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TenantId extends UuidValueObject
{
    public readonly type: 'TenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TenantId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}