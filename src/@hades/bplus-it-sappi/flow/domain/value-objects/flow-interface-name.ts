import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class FlowInterfaceName extends StringValueObject 
{
    public readonly type: 'FlowInterfaceName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowInterfaceName',
            nullable: false,
            undefinable: false,
            maxLength: 160,            
        }, validationRules));
    }
}