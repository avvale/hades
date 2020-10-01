import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ContactEmail extends StringValueObject 
{
    public readonly type: 'ContactEmail';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ContactEmail',
            nullable: false,
            undefinable: false,
            maxLength: 120,            
        }, validationRules));
    }
}