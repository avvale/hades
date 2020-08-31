import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelFlowInterfaceNamespace extends StringValueObject 
{
    public readonly type: 'ChannelFlowInterfaceNamespace';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelFlowInterfaceNamespace',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}