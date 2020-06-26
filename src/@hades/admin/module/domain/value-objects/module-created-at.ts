import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleCreatedAt extends TimestampValueObject 
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