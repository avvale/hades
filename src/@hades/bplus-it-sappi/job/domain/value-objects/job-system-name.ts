import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobSystemName extends StringValueObject 
{
    public readonly type: 'JobSystemName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobSystemName',
            nullable: false,
            undefinable: false,
            maxLength: 20,            
        }, validationRules));
    }
}