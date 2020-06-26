import { SmallintValueObject } from '@hades/shared/domain/value-objects/smallint.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleSort extends SmallintValueObject 
{
    public readonly type: 'ModuleSort';

    constructor(value: number, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleSort',
            nullable: false,
            undefinable: false,
            maxLength: 6,
        }, validationRules));
    }
}