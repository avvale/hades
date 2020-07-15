import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelDetailSystemName extends StringValueObject 
{
    public readonly type: 'ChannelDetailSystemName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDetailSystemName',
            nullable: false,
            undefinable: false,
            maxLength: 20,            
        }, validationRules));
    }
}