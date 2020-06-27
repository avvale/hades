import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class PermissionModuleId extends UuidValueObject
{
    public readonly type: 'PermissionModuleId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'PermissionModuleId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}