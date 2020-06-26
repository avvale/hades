import { Uuid } from '@hades/shared/domain/value-objects/uuid';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SystemTenantId extends Uuid 
{
    public readonly type: 'SystemTenantId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SystemTenantId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}