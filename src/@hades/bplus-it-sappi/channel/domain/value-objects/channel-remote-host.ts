import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelRemoteHost extends StringValueObject 
{
    public readonly type: 'ChannelRemoteHost';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelRemoteHost',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}