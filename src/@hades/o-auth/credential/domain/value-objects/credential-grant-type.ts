import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class CredentialGrantType extends EnumValueObject 
{
    public readonly type: 'CredentialGrantType';
    
    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'CredentialGrantType',
            nullable: false,
            undefinable: false,
            enumOptions:  ['authorization_code','client_credentials','implicit','password','refresh_token'],
        }, validationRules));
    }
}