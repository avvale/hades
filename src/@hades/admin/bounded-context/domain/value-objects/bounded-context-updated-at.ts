import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class BoundedContextUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'BoundedContextUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'BoundedContextUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}