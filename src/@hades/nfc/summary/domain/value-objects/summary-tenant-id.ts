import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SummaryTenantId extends UuidValueObject
{
    public readonly type: 'SummaryTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SummaryTenantId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}