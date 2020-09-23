import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class PermissionUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'PermissionUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'PermissionUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}