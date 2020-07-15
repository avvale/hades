import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelDetailExecutionExecutedAt extends TimestampValueObject 
{
    public readonly type: 'ChannelDetailExecutionExecutedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDetailExecutionExecutedAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}