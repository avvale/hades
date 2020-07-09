import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TagTenantId extends UuidValueObject
{
    public readonly type: 'TagTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TagTenantId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}