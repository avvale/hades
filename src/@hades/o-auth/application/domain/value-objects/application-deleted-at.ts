import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ApplicationDeletedAt extends TimestampValueObject 
{
    public readonly type: 'ApplicationDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ApplicationDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}