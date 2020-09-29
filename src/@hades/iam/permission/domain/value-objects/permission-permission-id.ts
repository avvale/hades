import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PermissionPermissionId extends UuidValueObject
{
    public readonly type: 'PermissionPermissionId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'PermissionPermissionId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}