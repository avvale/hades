import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SystemCancelledAt extends TimestampValueObject 
{
    public readonly type: 'SystemCancelledAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SystemCancelledAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}