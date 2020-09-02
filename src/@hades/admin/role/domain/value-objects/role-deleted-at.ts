import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class RoleDeletedAt extends TimestampValueObject 
{
    public readonly type: 'RoleDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RoleDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}