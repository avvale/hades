import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SystemDeletedAt extends TimestampValueObject 
{
    public readonly type: 'SystemDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SystemDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}