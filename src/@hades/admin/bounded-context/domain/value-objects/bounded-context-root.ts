import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class BoundedContextRoot extends StringValueObject 
{
    public readonly type: 'BoundedContextRoot';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'BoundedContextRoot',
            nullable: false,
            undefinable: false,
                        
        }, validationRules));
    }
}