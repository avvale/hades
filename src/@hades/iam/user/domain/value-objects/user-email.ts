import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class UserEmail extends StringValueObject 
{
    public readonly type: 'UserEmail';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'UserEmail',
            nullable: false,
            undefinable: false,
            maxLength: 120,            
        }, validationRules));
    }
}