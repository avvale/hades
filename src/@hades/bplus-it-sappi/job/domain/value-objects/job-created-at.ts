import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobCreatedAt extends TimestampValueObject 
{
    public readonly type: 'JobCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}