import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CredentialRefreshToken extends StringValueObject 
{
    public readonly type: 'CredentialRefreshToken';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'CredentialRefreshToken',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}