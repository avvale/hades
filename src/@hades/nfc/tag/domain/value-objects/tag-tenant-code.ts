import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TagTenantCode extends StringValueObject 
{
    public readonly type: 'TagTenantCode';   

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TagTenantCode',
            nullable: false,
            undefinable: false,
            maxLength: 50,            
        }, validationRules));
    }
}