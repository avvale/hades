import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailErrorCode extends StringValueObject 
{
    public readonly type: 'MessageDetailErrorCode';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailErrorCode',
            nullable: true,
            undefinable: true,
            maxLength: 20,            
        }, validationRules));
    }
}