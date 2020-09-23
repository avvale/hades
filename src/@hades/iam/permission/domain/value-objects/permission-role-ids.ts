import { UuidArrayValueObject } from '@hades/shared/domain/value-objects/uuid-array.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PermissionRoleIds extends UuidArrayValueObject 
{
    public readonly type: 'PermissionRoleIds';

    constructor(value: string[], validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'PermissionRoleIds',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}