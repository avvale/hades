import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PermissionDeletedAt extends TimestampValueObject 
{
    public readonly type: 'PermissionDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'PermissionDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}