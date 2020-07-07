import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class FlowTenantId extends UuidValueObject
{
    public readonly type: 'FlowTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowTenantId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}