import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ChannelOverviewDeletedAt extends TimestampValueObject 
{
    public readonly type: 'ChannelOverviewDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelOverviewDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}