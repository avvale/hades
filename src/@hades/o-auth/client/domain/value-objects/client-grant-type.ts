import { EnumValueObject } from '@hades/shared/domain/value-objects/enum.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ClientGrantType extends EnumValueObject 
{
    public readonly type: 'ClientGrantType';
    
    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ClientGrantType',
            nullable: false,
            undefinable: false,
            enumOptions:  ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD_GRANT'],
        }, validationRules));
    }
}