import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelOverviewUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'ChannelOverviewUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelOverviewUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}