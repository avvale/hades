import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelMessageProtocol extends StringValueObject 
{
    public readonly type: 'ChannelMessageProtocol';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelMessageProtocol',
            nullable: true,
            undefinable: true,
            maxLength: 60,            
        }, validationRules));
    }
}