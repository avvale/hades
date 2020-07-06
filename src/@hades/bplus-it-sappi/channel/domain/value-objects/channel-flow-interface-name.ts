import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelFlowInterfaceName extends StringValueObject 
{
    public readonly type: 'ChannelFlowInterfaceName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelFlowInterfaceName',
            nullable: false,
            undefinable: false,
            maxLength: 160,            
        }, validationRules));
    }
}