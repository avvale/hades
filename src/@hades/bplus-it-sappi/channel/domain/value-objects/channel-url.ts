import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelUrl extends StringValueObject 
{
    public readonly type: 'ChannelUrl';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelUrl',
            nullable: true,
            undefinable: true,
            maxLength: 320,            
        }, validationRules));
    }
}