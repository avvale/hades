import { Timestamp } from '@hades/shared/domain/value-objects/timestamp';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SystemCancelledAt extends Timestamp 
{
    public readonly type: 'SystemCancelledAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SystemCancelledAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}