import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class BoundedContextName extends StringValueObject 
{
    public readonly type: 'BoundedContextName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'BoundedContextName',
            nullable: false,
            undefinable: false,
                        
        }, validationRules));
    }
}