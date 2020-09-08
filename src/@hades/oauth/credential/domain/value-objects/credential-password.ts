import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class CredentialPassword extends StringValueObject 
{
    public readonly type: 'CredentialPassword';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'CredentialPassword',
            nullable: false,
            undefinable: false,
                        
        }, validationRules));
    }
}