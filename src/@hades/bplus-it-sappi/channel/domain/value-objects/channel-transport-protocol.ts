import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelTransportProtocol extends StringValueObject 
{
    public readonly type: 'ChannelTransportProtocol';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelTransportProtocol',
            nullable: true,
            undefinable: true,
            maxLength: 60,            
        }, validationRules));
    }
}