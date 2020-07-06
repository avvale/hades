import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelFlowComponent extends StringValueObject 
{
    public readonly type: 'ChannelFlowComponent';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelFlowComponent',
            nullable: false,
            undefinable: false,
            maxLength: 160,            
        }, validationRules));
    }
}