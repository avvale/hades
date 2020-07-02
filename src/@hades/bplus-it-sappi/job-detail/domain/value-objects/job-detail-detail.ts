import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobDetailDetail extends StringValueObject 
{
    public readonly type: 'JobDetailDetail';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobDetailDetail',
            nullable: false,
            undefinable: false,
            maxLength: 255,            
        }, validationRules));
    }
}