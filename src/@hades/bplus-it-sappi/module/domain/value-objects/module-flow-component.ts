import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleFlowComponent extends StringValueObject 
{
    public readonly type: 'ModuleFlowComponent';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleFlowComponent',
            nullable: false,
            undefinable: false,
            maxLength: 160,            
        }, validationRules));
    }
}