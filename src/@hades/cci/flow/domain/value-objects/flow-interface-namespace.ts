import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class FlowInterfaceNamespace extends StringValueObject 
{
    public readonly type: 'FlowInterfaceNamespace';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowInterfaceNamespace',
            nullable: false,
            undefinable: false,
            maxLength: 160,            
        }, validationRules));
    }
}