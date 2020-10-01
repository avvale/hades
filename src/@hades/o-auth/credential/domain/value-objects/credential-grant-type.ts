import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CredentialGrantType extends EnumValueObject 
{
    public readonly type: 'CredentialGrantType';
    
    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'CredentialGrantType',
            nullable: false,
            undefinable: false,
            enumOptions:  ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD'],
        }, validationRules));
    }
}