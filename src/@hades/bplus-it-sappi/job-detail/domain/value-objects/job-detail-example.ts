import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobDetailExample extends StringValueObject 
{
    public readonly type: 'JobDetailExample';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobDetailExample',
            nullable: false,
            undefinable: false,
            maxLength: 160,            
        }, validationRules));
    }
}