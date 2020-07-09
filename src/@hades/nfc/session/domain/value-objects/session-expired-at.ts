import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SessionExpiredAt extends TimestampValueObject 
{
    public readonly type: 'SessionExpiredAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SessionExpiredAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}