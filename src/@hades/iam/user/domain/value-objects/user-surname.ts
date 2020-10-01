import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class UserSurname extends StringValueObject 
{
    public readonly type: 'UserSurname';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'UserSurname',
            nullable: true,
            undefinable: true,
            maxLength: 255,            
        }, validationRules));
    }
}