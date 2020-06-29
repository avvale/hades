import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobDeletedAt extends TimestampValueObject 
{
    public readonly type: 'JobDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}