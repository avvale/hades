import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleFlowInterfaceName extends StringValueObject 
{
    public readonly type: 'ModuleFlowInterfaceName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleFlowInterfaceName',
            nullable: false,
            undefinable: false,
            maxLength: 160,            
        }, validationRules));
    }
}