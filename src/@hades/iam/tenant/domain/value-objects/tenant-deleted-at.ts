import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class TenantDeletedAt extends TimestampValueObject 
{
    public readonly type: 'TenantDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TenantDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}