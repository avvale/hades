import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelDetailExecutionId extends UuidValueObject
{
    public readonly type: 'ChannelDetailExecutionId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDetailExecutionId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}