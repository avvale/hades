import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobOverviewSystemId extends UuidValueObject
{
    public readonly type: 'JobOverviewSystemId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobOverviewSystemId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}