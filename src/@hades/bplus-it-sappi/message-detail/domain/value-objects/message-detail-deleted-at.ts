import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailDeletedAt extends TimestampValueObject 
{
    public readonly type: 'MessageDetailDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}