import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SessionCreatedAt extends TimestampValueObject 
{
    public readonly type: 'SessionCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SessionCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}