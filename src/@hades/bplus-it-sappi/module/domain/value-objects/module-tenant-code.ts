import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleTenantCode extends StringValueObject 
{
    public readonly type: 'ModuleTenantCode';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleTenantCode',
            nullable: false,
            undefinable: false,
            maxLength: 50,            
        }, validationRules));
    }
}