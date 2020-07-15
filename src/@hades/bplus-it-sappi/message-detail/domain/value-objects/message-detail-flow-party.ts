import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailFlowParty extends StringValueObject 
{
    public readonly type: 'MessageDetailFlowParty';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailFlowParty',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}