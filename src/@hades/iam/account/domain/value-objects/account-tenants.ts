import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountTenants extends JsonValueObject 
{
    public readonly type: 'AccountTenants';

    constructor(value: any, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'AccountTenants',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}