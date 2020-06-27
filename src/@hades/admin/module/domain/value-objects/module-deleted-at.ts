import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleDeletedAt extends TimestampValueObject 
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