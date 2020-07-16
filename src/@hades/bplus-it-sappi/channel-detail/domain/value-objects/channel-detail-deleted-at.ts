import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelDetailDeletedAt extends TimestampValueObject 
{
    public readonly type: 'ChannelDetailDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDetailDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}