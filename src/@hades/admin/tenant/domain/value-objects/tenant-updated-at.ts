import { Timestamp } from '@hades/shared/domain/value-objects/timestamp';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TenantUpdatedAt extends Timestamp 
{
    public readonly type: 'TenantUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TenantUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}