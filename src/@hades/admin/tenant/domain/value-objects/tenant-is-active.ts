import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TenantIsActive extends BooleanValueObject 
{
    public readonly type: 'TenantIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TenantIsActive',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}