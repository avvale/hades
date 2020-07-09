import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SummaryDeletedAt extends TimestampValueObject 
{
    public readonly type: 'SummaryDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SummaryDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}