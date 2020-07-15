import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobDetailNode extends StringValueObject 
{
    public readonly type: 'JobDetailNode';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobDetailNode',
            nullable: true,
            undefinable: true,
            maxLength: 160,            
        }, validationRules));
    }
}