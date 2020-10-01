import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelOverviewExecutionExecutedAt extends TimestampValueObject 
{
    public readonly type: 'ChannelOverviewExecutionExecutedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelOverviewExecutionExecutedAt',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}