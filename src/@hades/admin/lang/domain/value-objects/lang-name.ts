import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class LangName extends StringValueObject 
{
    public readonly type: 'LangName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'LangName',
            nullable: false,
            undefinable: false,
            maxLength: 255,            
        }, validationRules));
    }
}