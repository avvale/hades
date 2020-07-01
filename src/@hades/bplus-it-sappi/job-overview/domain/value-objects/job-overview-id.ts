import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobOverviewId extends UuidValueObject
{
    public readonly type: 'JobOverviewId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobOverviewId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}