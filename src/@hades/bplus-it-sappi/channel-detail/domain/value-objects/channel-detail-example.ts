import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelDetailExample extends StringValueObject 
{
    public readonly type: 'ChannelDetailExample';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDetailExample',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}