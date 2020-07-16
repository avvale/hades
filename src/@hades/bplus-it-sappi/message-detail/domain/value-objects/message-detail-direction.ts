import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailDirection extends StringValueObject 
{
    public readonly type: 'MessageDetailDirection';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailDirection',
            nullable: true,
            undefinable: true,
            maxLength: 20,            
        }, validationRules));
    }
}