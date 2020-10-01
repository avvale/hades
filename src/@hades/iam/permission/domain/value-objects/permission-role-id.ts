import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PermissionRoleId extends UuidValueObject
{
    public readonly type: 'PermissionRoleId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'PermissionRoleId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}