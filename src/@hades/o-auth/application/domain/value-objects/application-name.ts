import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ApplicationName extends StringValueObject 
{
    public readonly type: 'ApplicationName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ApplicationName',
            nullable: false,
            undefinable: false,
            maxLength: 255,            
        }, validationRules));
    }
}