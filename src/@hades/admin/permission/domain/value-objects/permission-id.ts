import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class PermissionId extends UuidValueObject
{
    public readonly type: 'PermissionId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'PermissionId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}