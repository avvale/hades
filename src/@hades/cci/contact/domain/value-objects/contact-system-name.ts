import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ContactSystemName extends StringValueObject 
{
    public readonly type: 'ContactSystemName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ContactSystemName',
            nullable: false,
            undefinable: false,
            maxLength: 20,            
        }, validationRules));
    }
}