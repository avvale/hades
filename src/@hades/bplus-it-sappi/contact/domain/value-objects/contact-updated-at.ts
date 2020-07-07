import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ContactUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'ContactUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ContactUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}