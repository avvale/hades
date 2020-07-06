import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class FlowDescription extends StringValueObject 
{
    public readonly type: 'FlowDescription';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'FlowDescription',
            nullable: true,
            undefinable: true,
            maxLength: 255,            
        }, validationRules));
    }
}