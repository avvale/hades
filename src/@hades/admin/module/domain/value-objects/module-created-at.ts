import { Timestamp } from '@hades/shared/domain/value-objects/timestamp';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleCreatedAt extends Timestamp 
{
    public readonly type: 'ModuleCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}