import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageDetailFlowComponent extends StringValueObject 
{
    public readonly type: 'MessageDetailFlowComponent';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailFlowComponent',
            nullable: false,
            undefinable: false,
            maxLength: 160,            
        }, validationRules));
    }
}