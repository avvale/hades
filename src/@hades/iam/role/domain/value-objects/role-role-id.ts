import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class RoleRoleId extends UuidValueObject
{
    public readonly type: 'RoleRoleId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RoleRoleId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}