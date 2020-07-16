import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailStartTimeAt extends TimestampValueObject 
{
    public readonly type: 'MessageDetailStartTimeAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailStartTimeAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}