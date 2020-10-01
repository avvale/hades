import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ModuleFlowReceiverComponent extends StringValueObject 
{
    public readonly type: 'ModuleFlowReceiverComponent';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleFlowReceiverComponent',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}