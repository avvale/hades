import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class PermissionBoundedContextId extends UuidValueObject
{
    public readonly type: 'PermissionBoundedContextId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'PermissionBoundedContextId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}