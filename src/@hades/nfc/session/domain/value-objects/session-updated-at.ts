import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SessionUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'SessionUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SessionUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}