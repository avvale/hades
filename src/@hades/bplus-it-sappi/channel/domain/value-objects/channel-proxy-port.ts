import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelProxyPort extends StringValueObject 
{
    public readonly type: 'ChannelProxyPort';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelProxyPort',
            nullable: true,
            undefinable: true,
            maxLength: 20,            
        }, validationRules));
    }
}