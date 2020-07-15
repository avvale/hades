import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelDetailChannelName extends StringValueObject 
{
    public readonly type: 'ChannelDetailChannelName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDetailChannelName',
            nullable: false,
            undefinable: false,
            maxLength: 160,            
        }, validationRules));
    }
}