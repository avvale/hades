import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelDirection extends EnumValueObject 
{
    public readonly type: 'ChannelDirection';
    
    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDirection',
            nullable: true,
            undefinable: true,
            enumOptions:  ['SENDER','RECEIVER'],
        }, validationRules));
    }
}