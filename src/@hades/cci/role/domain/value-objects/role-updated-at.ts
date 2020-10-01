import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class RoleUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'RoleUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RoleUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}