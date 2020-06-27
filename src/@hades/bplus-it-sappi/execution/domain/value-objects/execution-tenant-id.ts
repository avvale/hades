import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ExecutionTenantId extends UuidValueObject
{
    public readonly type: 'ExecutionTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ExecutionTenantId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}