import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class LangIetf extends StringValueObject 
{
    public readonly type: 'LangIetf';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'LangIetf',
            nullable: false,
            undefinable: false,
            length: 5,            
        }, validationRules));
    }
}