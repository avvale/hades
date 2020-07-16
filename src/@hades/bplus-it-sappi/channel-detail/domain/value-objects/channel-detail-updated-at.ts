import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelDetailUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'ChannelDetailUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDetailUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}