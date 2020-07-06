import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelDirection extends StringValueObject 
{
    public readonly type: 'ChannelDirection';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDirection',
            nullable: true,
            undefinable: true,
            maxLength: 60,            
        }, validationRules));
    }
}