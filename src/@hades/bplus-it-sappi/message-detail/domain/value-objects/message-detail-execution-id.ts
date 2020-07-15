import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class MessageDetailExecutionId extends UuidValueObject
{
    public readonly type: 'MessageDetailExecutionId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageDetailExecutionId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}