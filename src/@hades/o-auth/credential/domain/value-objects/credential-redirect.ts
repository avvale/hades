import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CredentialRedirect extends StringValueObject 
{
    public readonly type: 'CredentialRedirect';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'CredentialRedirect',
            nullable: true,
            undefinable: true,
            maxLength: 2048,            
        }, validationRules));
    }
}