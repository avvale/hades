import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ContactName extends StringValueObject 
{
    public readonly type: 'ContactName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ContactName',
            nullable: false,
            undefinable: false,
            maxLength: 255,            
        }, validationRules));
    }
}