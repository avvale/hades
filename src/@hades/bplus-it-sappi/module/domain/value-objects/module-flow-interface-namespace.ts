import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleFlowInterfaceNamespace extends StringValueObject 
{
    public readonly type: 'ModuleFlowInterfaceNamespace';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleFlowInterfaceNamespace',
            nullable: false,
            undefinable: false,
            maxLength: 160,            
        }, validationRules));
    }
}