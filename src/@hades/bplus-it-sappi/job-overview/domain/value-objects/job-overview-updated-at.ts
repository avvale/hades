import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class JobOverviewUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'JobOverviewUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobOverviewUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}