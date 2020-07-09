import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SessionDeletedAt extends TimestampValueObject 
{
    public readonly type: 'SessionDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SessionDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}