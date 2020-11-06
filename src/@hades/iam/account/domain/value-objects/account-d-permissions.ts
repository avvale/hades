import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountDPermissions extends JsonValueObject
{
    public readonly type: 'AccountDPermissions';

    constructor(value: any, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AccountDPermissions',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}