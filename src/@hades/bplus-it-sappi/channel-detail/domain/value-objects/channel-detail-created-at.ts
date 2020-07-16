import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelDetailCreatedAt extends TimestampValueObject 
{
    public readonly type: 'ChannelDetailCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDetailCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}