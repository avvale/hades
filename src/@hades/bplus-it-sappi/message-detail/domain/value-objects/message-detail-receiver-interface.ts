import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailReceiverInterface extends StringValueObject 
{
    public readonly type: 'MessageDetailReceiverInterface';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailReceiverInterface',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}