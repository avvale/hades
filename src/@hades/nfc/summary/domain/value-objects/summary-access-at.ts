import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SummaryAccessAt extends TimestampValueObject 
{
    public readonly type: 'SummaryAccessAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SummaryAccessAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}