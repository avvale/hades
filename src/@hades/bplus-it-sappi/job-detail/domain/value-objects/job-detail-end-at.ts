import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobDetailEndAt extends TimestampValueObject 
{
    public readonly type: 'JobDetailEndAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobDetailEndAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}