import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobOverviewExecutionId extends UuidValueObject
{
    public readonly type: 'JobOverviewExecutionId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobOverviewExecutionId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}