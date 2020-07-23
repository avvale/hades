import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobDetailStartAt extends TimestampValueObject 
{
    public readonly type: 'JobDetailStartAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobDetailStartAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}