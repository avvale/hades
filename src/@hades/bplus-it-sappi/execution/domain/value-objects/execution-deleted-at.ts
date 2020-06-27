import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ExecutionDeletedAt extends TimestampValueObject 
{
    public readonly type: 'ExecutionDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ExecutionDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}