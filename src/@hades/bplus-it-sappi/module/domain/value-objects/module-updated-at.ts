import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'ModuleUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}