import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleName extends StringValueObject 
{
    public readonly type: 'ModuleName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleName',
            nullable: true,
            undefinable: true,
            maxLength: 320,            
        }, validationRules));
    }
}