import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelName extends StringValueObject 
{
    public readonly type: 'ChannelName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelName',
            nullable: false,
            undefinable: false,
            maxLength: 160,            
        }, validationRules));
    }
}