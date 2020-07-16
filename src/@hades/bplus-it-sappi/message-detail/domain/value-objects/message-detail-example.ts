import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailExample extends StringValueObject 
{
    public readonly type: 'MessageDetailExample';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailExample',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}