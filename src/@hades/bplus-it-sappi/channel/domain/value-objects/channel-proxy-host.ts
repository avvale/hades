import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelProxyHost extends StringValueObject 
{
    public readonly type: 'ChannelProxyHost';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelProxyHost',
            nullable: true,
            undefinable: true,
            maxLength: 60,            
        }, validationRules));
    }
}