import { UuidArrayValueObject } from '@hades/shared/domain/value-objects/uuid-array.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class RolePermissionIds extends UuidArrayValueObject
{
    public readonly type: 'RolePermissionIds';

    constructor(value: string[], validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'RolePermissionIds',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}