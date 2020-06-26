import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleIsActive extends BooleanValueObject 
{
    public readonly type: 'ModuleIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleIsActive',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}