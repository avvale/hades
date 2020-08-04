import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleFlowHash extends StringValueObject 
{
    public readonly type: 'ModuleFlowHash';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleFlowHash',
            nullable: false,
            undefinable: false,
            length: 40,            
        }, validationRules));
    }
}