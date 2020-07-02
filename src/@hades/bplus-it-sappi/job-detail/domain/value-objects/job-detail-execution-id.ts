import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobDetailExecutionId extends UuidValueObject
{
    public readonly type: 'JobDetailExecutionId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobDetailExecutionId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}