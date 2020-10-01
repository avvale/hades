import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailReceiverParty extends StringValueObject 
{
    public readonly type: 'MessageDetailReceiverParty';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailReceiverParty',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}