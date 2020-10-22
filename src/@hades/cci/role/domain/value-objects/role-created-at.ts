import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class RoleCreatedAt extends TimestampValueObject 
{
    public readonly type: 'RoleCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RoleCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}