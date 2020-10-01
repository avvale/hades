import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CredentialClientSecret extends StringValueObject 
{
    public readonly type: 'CredentialClientSecret';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'CredentialClientSecret',
            nullable: true,
            undefinable: true,
            maxLength: 90,            
        }, validationRules));
    }
}