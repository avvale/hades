import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ContactRoleName extends StringValueObject 
{
    public readonly type: 'ContactRoleName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ContactRoleName',
            nullable: true,
            undefinable: true,
            maxLength: 255,            
        }, validationRules));
    }
}