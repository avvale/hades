import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class PermissionCreatedAt extends TimestampValueObject 
{
    public readonly type: 'PermissionCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'PermissionCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}