import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class RoleIsMaster extends BooleanValueObject 
{
    public readonly type: 'RoleIsMaster';

    constructor(value: boolean, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RoleIsMaster',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}