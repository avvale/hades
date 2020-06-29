import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobExecutionId extends UuidValueObject
{
    public readonly type: 'JobExecutionId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobExecutionId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}