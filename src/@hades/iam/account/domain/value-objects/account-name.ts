import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountName extends StringValueObject 
{
    public readonly type: 'AccountName';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'AccountName',
            nullable: false,
            undefinable: false,
            maxLength: 255,            
        }, validationRules));
    }
}