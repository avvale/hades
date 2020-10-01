import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailFlowHash extends StringValueObject 
{
    public readonly type: 'MessageDetailFlowHash';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailFlowHash',
            nullable: false,
            undefinable: false,
            length: 40,            
        }, validationRules));
    }
}