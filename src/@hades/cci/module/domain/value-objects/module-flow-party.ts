import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ModuleFlowParty extends StringValueObject 
{
    public readonly type: 'ModuleFlowParty';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleFlowParty',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}