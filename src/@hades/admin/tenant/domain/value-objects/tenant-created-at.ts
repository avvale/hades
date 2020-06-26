import { Timestamp } from '@hades/shared/domain/value-objects/timestamp';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TenantCreatedAt extends Timestamp 
{
    public readonly type: 'TenantCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TenantCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}