import { Timestamp } from '@hades/shared/domain/value-objects/timestamp';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TenantDeletedAt extends Timestamp 
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