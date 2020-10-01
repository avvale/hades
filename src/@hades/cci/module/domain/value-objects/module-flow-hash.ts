import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ModuleFlowHash extends StringValueObject 
{
    public readonly type: 'ModuleFlowHash';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleFlowHash',
            nullable: true,
            undefinable: true,
            length: 40,            
        }, validationRules));
    }
}