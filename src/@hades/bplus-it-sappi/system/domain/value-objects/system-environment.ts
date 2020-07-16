import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SystemEnvironment extends StringValueObject 
{
    public readonly type: 'SystemEnvironment';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SystemEnvironment',
            nullable: false,
            undefinable: false,
                        
        }, validationRules));
    }
}