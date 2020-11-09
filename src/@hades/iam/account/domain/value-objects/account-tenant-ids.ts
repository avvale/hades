import { UuidArrayValueObject } from '@hades/shared/domain/value-objects/uuid-array.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountTenantIds extends UuidArrayValueObject
{
    public readonly type: 'AccountTenantIds';

    constructor(value: string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AccountTenantIds',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}