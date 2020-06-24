import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class LangIso6392 extends StringValueObject 
{
    public readonly type: 'LangIso6392';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'LangIso6392',
            nullable: false,
            undefinable: false,
            length: 2,            
        }, validationRules));
    }
}