import { UuidArrayValueObject } from '@hades/shared/domain/value-objects/uuid-array.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountRoleIds extends UuidArrayValueObject
{
    public readonly type: 'AccountRoleIds';

    constructor(value: string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AccountRoleIds',
            nullable:  true ,
            undefinable:  true ,
        }, validationRules));
    }
}