import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleParameterName extends StringValueObject 
{
    public readonly type: 'ModuleParameterName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleParameterName',
            nullable: true,
            undefinable: true,
            maxLength: 320,            
        }, validationRules));
    }
}