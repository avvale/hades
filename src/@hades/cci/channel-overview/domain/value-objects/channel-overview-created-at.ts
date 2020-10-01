import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelOverviewCreatedAt extends TimestampValueObject 
{
    public readonly type: 'ChannelOverviewCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelOverviewCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}