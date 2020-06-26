import { Timestamp } from '@hades/shared/domain/value-objects/timestamp';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleDeletedAt extends Timestamp 
{
    public readonly type: 'ModuleDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}