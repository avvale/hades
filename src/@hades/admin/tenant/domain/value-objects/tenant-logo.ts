import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TenantLogo extends StringValueObject 
{
    public readonly type: 'TenantLogo';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TenantLogo',
            nullable: false,
            undefinable: false,
            maxLength: 255,            
        }, validationRules));
    }
}