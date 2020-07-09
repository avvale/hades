import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SummaryUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'SummaryUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SummaryUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}