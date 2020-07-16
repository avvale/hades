import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailErrorLabel extends StringValueObject 
{
    public readonly type: 'MessageDetailErrorLabel';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailErrorLabel',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}