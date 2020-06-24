import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TenantData extends JsonValueObject 
{
    public readonly type: 'TenantData';

    constructor(value: any, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TenantData',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}