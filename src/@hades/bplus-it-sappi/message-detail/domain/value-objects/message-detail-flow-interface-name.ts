import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailFlowInterfaceName extends StringValueObject 
{
    public readonly type: 'MessageDetailFlowInterfaceName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailFlowInterfaceName',
            nullable: false,
            undefinable: false,
            maxLength: 160,            
        }, validationRules));
    }
}