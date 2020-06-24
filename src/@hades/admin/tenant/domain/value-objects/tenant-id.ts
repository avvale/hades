import { Uuid } from '@hades/shared/domain/value-objects/uuid';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class TenantId extends Uuid 
{
    public readonly type: 'TenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'TenantId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}