import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelRemotePort extends StringValueObject 
{
    public readonly type: 'ChannelRemotePort';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelRemotePort',
            nullable: true,
            undefinable: true,
            maxLength: 20,            
        }, validationRules));
    }
}