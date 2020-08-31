import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelFlowParty extends StringValueObject 
{
    public readonly type: 'ChannelFlowParty';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelFlowParty',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}