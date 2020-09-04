import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleParameterValue extends StringValueObject 
{
    public readonly type: 'ModuleParameterValue';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleParameterValue',
            nullable: true,
            undefinable: true,
            maxLength: 2048,            
        }, validationRules));
    }
}