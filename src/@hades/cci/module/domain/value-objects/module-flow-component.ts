import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ModuleFlowComponent extends StringValueObject 
{
    public readonly type: 'ModuleFlowComponent';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleFlowComponent',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}