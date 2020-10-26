import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountDTenants extends JsonValueObject
{
    public readonly type: 'AccountDTenants';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AccountDTenants',
            nullable:  false ,
            undefinable:  false ,
        }, validationRules));
    }
}