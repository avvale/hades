import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class FlowLastChangeUserAccount extends StringValueObject 
{
    public readonly type: 'FlowLastChangeUserAccount';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowLastChangeUserAccount',
            nullable: true,
            undefinable: true,
            maxLength: 20,            
        }, validationRules));
    }
}