import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SystemTenantId extends UuidValueObject
{
    public readonly type: 'SystemTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SystemTenantId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}