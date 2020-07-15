import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailExecutionExecutedAt extends TimestampValueObject 
{
    public readonly type: 'MessageDetailExecutionExecutedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailExecutionExecutedAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}